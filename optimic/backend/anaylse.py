from typing import Any, Dict, List, Literal, Optional
import duckdb
from langchain_core.messages import HumanMessage, SystemMessage
import pandas as pd
from pydantic import BaseModel, Field
from state import ANALYTICS_PROMPT, fast_llm


# 1. Pydantic schema for structured visualization specs
class ChartSpec(BaseModel):
    chart_type: Literal["bar", "line", "area", "pie"] = Field(
        description="Select 'bar', 'line', 'area', or 'pie'."
    )
    title: str = Field(description="Short title for the chart.")
    x_key: str = Field(description="Column name for the X-axis / category label.")
    y_key: str = Field(
        description="Column name for the Y-axis / aggregated numeric value."
    )


# 2. Main structured output schema for the LLM
class LLMAnalysisOutput(BaseModel):
    sql: str = Field(
        description="Valid DuckDB SQL query against table `df`. Use TRY_CAST for numbers/dates and always aggregate."
    )
    chart: Optional[ChartSpec] = Field(
        default=None,
        description="Chart configuration if the query can be plotted; otherwise None.",
    )
    explanation: str = Field(
        description="Concise analytical explanation of the answer."
    )


# 3. Main analysis function
async def run_dataset_analysis(
    question: str,
    headers: List[str],
    rows: List[List[Any]],
    dataset_name: str = "dataset",
) -> Dict[str, Any]:
    if not headers or not rows:
        return {
            "reply": "The selected dataset contains no rows or columns to analyze.",
            "chart": None,
            "executed_sql": None,
        }

    # 1. Convert client rows to an in-memory Pandas DataFrame
    df = pd.DataFrame(rows, columns=headers)
    sample_rows = df.head(3).values.tolist()

    # 2. Prepare structured LLM using fast_llm (matching validation_agent pattern)
    analytics_llm = fast_llm.with_structured_output(LLMAnalysisOutput)

    prompt = ANALYTICS_PROMPT.format(columns=headers, sample_rows=sample_rows)
    messages = [
        SystemMessage(content=prompt),
        HumanMessage(content=f"User question: {question}"),
    ]

    analysis: LLMAnalysisOutput = await analytics_llm.ainvoke(messages)

    # 3. Execute the SQL query directly on `df` in DuckDB
    chart_data = None
    try:
        query_res = duckdb.query(analysis.sql).to_df()
        records = query_res.to_dict(orient="records")

        if analysis.chart and records:
            chart_data = {
                "chart_type": analysis.chart.chart_type,
                "title": analysis.chart.title,
                "x_key": analysis.chart.x_key,
                "y_key": analysis.chart.y_key,
                "data": records,
            }
    except Exception as e:
        return {
            "reply": f"Database execution error: {str(e)}",
            "chart": None,
            "executed_sql": analysis.sql,
        }

    return {
        "reply": analysis.explanation,
        "chart": chart_data,
        "executed_sql": analysis.sql,
    }
