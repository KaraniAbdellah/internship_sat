
from pydantic import BaseModel, Field
from typing import  Any, List, Literal, Optional

# Define Analyse Data Model
## Payload received from the React frontend
class AnalyseData(BaseModel):
    question: str
    headers: List[str]
    rows: List[List[Any]]
    dataset_name: str = "dataset"

## Visualization schema produced by the LLM
class ChartSpec(BaseModel):
    chart_type: Literal["bar", "line", "area", "pie"] = Field(
        description="Choose 'bar' (rankings/comparisons), 'line' (trends over time), 'area' (cumulative volume), or 'pie' (proportions with fewer than 6 categories)."
    )
    title: str = Field(description="A clean, descriptive title for the chart.")
    x_key: str = Field(
        description="Column name to use for the X-axis (or category label)."
    )
    y_key: str = Field(
        description="Column name to use for the Y-axis (numeric aggregation)."
    )

## Enforced Pydantic schema for with_structured_output
class LLMAnalysisOutput(BaseModel):
    sql: str = Field(
        description="A valid DuckDB SQL query against the `df` table. Cast string columns safely (e.g., TRY_CAST(col AS DOUBLE)), apply aggregations (SUM, COUNT, etc.), and enforce LIMIT 15."
    )
    chart: Optional[ChartSpec] = Field(
        default=None,
        description="Chart configuration if the user query can be visualized; otherwise None.",
    )
    explanation: str = Field(
        description="A concise executive summary explaining the findings to the user."
    )



# Define Data Models
class MarketingData(BaseModel):
    customer_data: str = "no customer data"
    policies: str = "no offre polices"
    user_uid: str = "thread-1"



# Define Data Chat Model
class UploadData(BaseModel):
    rows: list = []
    headers: list = []
    dataset_name: str = "no name"
    dataset_id: str = "no id"
    user_uid: str = "thread-1"
    is_active: bool = False

# Define Data Chat Model
class ChatData(BaseModel):
    question: str = "no question"
    user_uid: str = "thread-1"
    dataset_id: str = "no dataset id"

# User Model
class UserData(BaseModel):
    email: str = "no email"
    name: str = "no full name"
    user_uid: str = "no uid"
