from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.risk_assessment import run_risk_assessment  # Import your function

# Create a FastAPI router for risk assessment
router = APIRouter()

# Define what inputs this API expects
class RiskAssessmentInput(BaseModel):
    investment_amount: float
    duration: int
    risk_appetite: float
    market_condition: str
    stocks: float
    bonds: float
    real_estate: float
    commodities: float

@router.post("/risk-assessment")
async def risk_assessment(data: RiskAssessmentInput):
    try:
        # Call the risk assessment function
        result = run_risk_assessment(
            investment_amount=data.investment_amount,
            duration=data.duration,
            risk_appetite=data.risk_appetite,
            market_condition=data.market_condition,
            stocks=data.stocks,
            bonds=data.bonds,
            real_estate=data.real_estate,
            commodities=data.commodities
        )
        return result  # Return the results to the frontend or API caller

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from services.risk_assessment import run_risk_assessment  # Import your function

# # Create a FastAPI router for risk assessment
# router = APIRouter()

# # Define expected inputs
# class RiskAssessmentInput(BaseModel):
#     investment_amount: float
#     duration: int
#     risk_appetite: float
#     market_condition: str
#     stocks: float
#     bonds: float
#     real_estate: float
#     commodities: float

# @router.post("/")
# async def risk_assessment(request: RiskAssessmentInput):
#     try:
#         # Use the correct variable name
#         result = run_risk_assessment(
#             investment_amount=request.investment_amount,
#             duration=request.duration,
#             risk_appetite=request.risk_appetite,
#             market_condition=request.market_condition,
#             stocks=request.stocks,
#             bonds=request.bonds,
#             real_estate=request.real_estate,
#             commodities=request.commodities
#         )
#         return {"status": "success", "data": result}  # Standardized response

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")