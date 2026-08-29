# Import packages
from urllib import response

from langgraph.graph import StateGraph, END
from langchain.messages import AIMessage, HumanMessage, SystemMessage
from langgraph.checkpoint.memory import InMemorySaver


from state import MarketingState, ValidationResult
from state import GENERATION_PROMPT
from state import OPTIMISATION_PROMPT
from state import VALIDATION_PROMPT
from state import SCORING_PROMPT
from state import fast_llm




# Scoring Agent
async def scoring_agent(state: MarketingState):
    print("Scoring Agent ...")
    customer_data = state.get("customer_data", "no customer data")
    
    messages = [SystemMessage(content=SCORING_PROMPT), HumanMessage(content=f"""
        Customer Data: \n\n
            {customer_data}
        """)]
    score = await fast_llm.ainvoke(messages) # Asynchronously ainvoke

    return {
        "score": score.content,
        "next": "GENERATION",
    }


# Generation Agent
async def generation_agent(state: MarketingState):
    print("Generation Agent ...")
    current_context = f"""
        Customer Data: {state.get('customer_data')}
        Customer Score: {state.get('score')}
        Active Rules: {state.get('offre_rules')}
    """
    
    messages = [
        SystemMessage(content=GENERATION_PROMPT),
        HumanMessage(
            content=f"""
            Current Context: \n\n   
                {current_context}
            """
        )
    ]
    offre = await fast_llm.ainvoke(messages)
    return {
        "offre": offre.content,
        "next": "VALIDATION"
    }


# Validation Agent
async def validation_agent(state: MarketingState):
    print("Validation Agent ...")
    offre = state.get("offre", "no offre")
    offre_rules = state.get("offre_rules", "no offre polices")
    validation_llm = fast_llm.with_structured_output(ValidationResult)
    messages = [SystemMessage(content=VALIDATION_PROMPT), HumanMessage(content=
        f"""
        Offre: \n\n
            {offre}
        Offre Rules: \n\n
            {offre_rules}
        """
    )]

    result = await validation_llm.ainvoke(messages)
    print("Validation Feedback: ", result.validation)
    print("Validation Description: ", result.description)
    if (result.validation):
        return {"validation_feedback": result, "next": "END"}
    else:
        return {"validation_feedback": result, "next": "OPTIMISATION"}


# Optimisation Agent
async def optmisation_agent(state: MarketingState):
    print("Optimisation Agent ...")
    messages = [
        SystemMessage(content=OPTIMISATION_PROMPT),
        HumanMessage(
            content=f"""
            Current Offer: {state.get('offre')}
            Validation Feedback: {state.get('validation_feedback')}
            """
        ),
    ]
    optimized = await fast_llm.ainvoke(messages)
    return {
        "optimized_offre": optimized.content,
        "next": "END",
    }



# Supervisor agent
async def supervisor_agent(state: MarketingState):
    print("Supervisor Agent ...")
    return state


# Build the State Graph
def routerForSupervisor(state: MarketingState):
    return state.get("next", "END")



# Compile the State Graph
def compile_state_graph():
    workflow = StateGraph(MarketingState)

    workflow.add_node("supervisor_agent", supervisor_agent)
    workflow.add_node("scoring_agent", scoring_agent)

    workflow.add_edge("scoring_agent", "supervisor_agent")

    workflow.add_node("generation_agent", generation_agent)
    workflow.add_edge("generation_agent", "supervisor_agent")


    workflow.add_node("validation_agent", validation_agent)
    workflow.add_edge("validation_agent", "supervisor_agent")


    workflow.add_node("optmisation_agent", optmisation_agent)
    workflow.add_edge("optmisation_agent", "supervisor_agent")


    workflow.set_entry_point("supervisor_agent")
    workflow.add_conditional_edges("supervisor_agent", routerForSupervisor, 
        {
            "SCORING": "scoring_agent",
            "GENERATION": "generation_agent",
            "VALIDATION": "validation_agent",
            "OPTIMISATION": "optmisation_agent",
            "END": END
        }
    )

    # Memory
    checkpointer = InMemorySaver()
    return workflow.compile(checkpointer=checkpointer)




