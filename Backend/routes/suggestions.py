from fastapi import APIRouter, Query
from services.suggestions_services import get_optimized_portfolio

router = APIRouter()

@router.get("/portfolio_suggestions")
async def get_suggestions(
    investment: float = Query(10000, gt=0, description="Total investment amount"),
    duration: int = Query(5, ge=1, le=30, description="Investment duration in years"),
    risk_tolerance: float = Query(0.5, ge=0.01, le=1.0, description="User risk preference (0=Low, 1=High)"),
    stocks: float = Query(0.25, ge=0, le=1, description="Initial allocation to Stocks"),
    bonds: float = Query(0.25, ge=0, le=1, description="Initial allocation to Bonds"),
    real_estate: float = Query(0.25, ge=0, le=1, description="Initial allocation to Real Estate"),
    commodities: float = Query(0.25, ge=0, le=1, description="Initial allocation to Commodities")
):
    """
    API endpoint to return portfolio optimization suggestions based on user input.
    Uses investment parameters, risk tolerance, and initial asset allocation.
    """
    # Ensure weights sum to 1
    user_allocation = [stocks, bonds, real_estate, commodities]
    total_allocation = sum(user_allocation)

    if not (0.99 <= total_allocation <= 1.01):  # Allow small floating-point error
        return {"error": "Allocations must sum to 1."}

    # Get optimized allocation
    optimized_allocation = get_optimized_portfolio(investment, duration, user_allocation, risk_tolerance)

    return {"optimized_allocation": optimized_allocation}
