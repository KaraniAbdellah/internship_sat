from typing import Any, Dict, List
import pandas as pd
from pydantic import BaseModel, Field
from langchain_core.messages import SystemMessage, HumanMessage
from state import fast_llm, REPORTS_PROMPT

class MetricCard(BaseModel):
    label: str = Field(description="Short metric name (e.g. Total Revenue, Orders, Top Segment)")
    value: str = Field(description="Formatted value string (e.g. '$14,250', '316', 'Debit Card')")
    detail: str = Field(description="Short context (e.g. 'Primary volume driver')")


class StructuredReport(BaseModel):
    title: str = Field(description="Short, punchy executive report title")
    executive_summary: str = Field(description="2-3 sentence high-level summary")
    metrics: List[MetricCard] = Field(description="Exactly 4 prominent numeric metrics")
    detailed_analysis: str = Field(description="Concise Markdown breakdown with 2-3 focused tables and bullet points")
    action_items: List[str] = Field(description="3 to 4 short, actionable next steps")



async def generate_dataset_report(
    headers: List[str],
    rows: List[List[Any]],
    dataset_name: str = "dataset",
    report_type: str = "Executive Performance Summary",
) -> Dict[str, Any]:
    if not headers or not rows:
        return {
            "title": "Empty Dataset",
            "executive_summary": "The active dataset contains no rows or columns to report on.",
            "metrics": [],
            "detailed_analysis": "No data available.",
            "action_items": ["Upload or select a dataset with valid records."],
        }

    # In-memory DataFrame summary
    df = pd.DataFrame(rows, columns=headers)
    stats_summary = df.describe(include="all").fillna("-").to_string()
    sample_rows = df.head(5).to_dict(orient="records")

    # Increase max output tokens (4096) to prevent truncation
    llm_with_tokens = fast_llm.bind(max_tokens=4096)
    reporting_llm = llm_with_tokens.with_structured_output(StructuredReport)

    prompt = REPORTS_PROMPT.format(
        dataset_name=dataset_name,
        total_rows=len(df),
        columns=", ".join(headers),
        stats_summary=stats_summary,
        sample_rows=sample_rows,
        report_type=report_type or "Executive Performance Summary",
    )

    messages = [
        SystemMessage(content=prompt),
        HumanMessage(content=f"Generate a concise {report_type} for {dataset_name}."),
    ]
    print("messages:", messages)

    report: StructuredReport = await reporting_llm.ainvoke(messages)
    return report.model_dump()
