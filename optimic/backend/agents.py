# Import packages
from langgraph.graph import StateGraph, END
from langchain.messages import HumanMessage, SystemMessage

from state import MarketingState
from state import GENERATION_PROMPT
from state import OPTIMISATION_PROMPT
from state import VALIDATION_PROMPT
from state import SCORING_PROMPT
from state import basic_llm



# Scoring Agent
def scoring_agent(state: MarketingState):
    print("Scoring Agent ...")
    customer_data = state.get("customer_data", "no customer data")
    messages = [HumanMessage(content=f"Customer Data: {customer_data}"), SystemMessage(content=SCORING_PROMPT)]
    score = basic_llm.invoke(messages)

    return {
        "score": score,
        "next": "GENERATION",
    }


# Generation Agent
def generation_agent(state: MarketingState):
    print("Generation Agent ...")
    customer_data = state.get("customer_data", "no customer data")
    customer_score = state.get("score", "no score")
    offre_rules = state.get('offre_rules', "no offre rules")
    messages = [
        SystemMessage(content=GENERATION_PROMPT),
        HumanMessage(
            content=f"""
            Customer Data: \n\n
            {customer_data}
            
            Customer Score: \n\n
            {customer_score}
            
            Offre Rules: \n\n
            {offre_rules}
            """
        )
    ]
    offre = basic_llm.invoke(messages)
    return {
        "offre": offre,
        "next": "VALIDATION"
    }


# Validation Agent
def validation_agent(state: MarketingState):
    print("Validation Agent ...")
    offre = state.get("offre", "no offre")
    offre_rules = state.get("offre_rules", "no offre polices")
    messages = [SystemMessage(content=VALIDATION_PROMPT), HumanMessage(content=
        f"""
        Offre: \n\n
            {offre}
        Offre Rules: \n\n
            {offre_rules}
        """
    )]

    response = basic_llm.invoke(messages)
    return {"validation_feedback": response, "next": "OPTIMISATION"}



# Optimisation Agent
def optmisation_agent(state: MarketingState):
    print("Optimisation Agent ...")
    validation_feedback = state.get("validation_feedback", "no validation feedback")
    offre = state.get("offre", "no offre")
    messages = [SystemMessage(content=OPTIMISATION_PROMPT), HumanMessage(content=f"""
        Validation feedback: \n\n
            {validation_feedback}
        Original Offer: \n\n 
            {offre}
        """)]
    
    response = basic_llm.invoke(messages)
    return {"optimized_offre": response, "next": "END"}

# Supervisor agent
def supervisor_agent(state: MarketingState):
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

    return workflow.compile()




