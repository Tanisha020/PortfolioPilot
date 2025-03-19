from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.simulation_ import run_simulation

router = APIRouter()

# Define request body structure
class SimulationRequest(BaseModel):
    investment_amount: float
    duration: int
    risk_appetite: float  # Slider input (0 to 1)
    market_condition: str  # 'bull', 'bear', 'neutral'
    stocks: float
    bonds: float
    real_estate: float
    commodities: float

@router.post("/")  # ✅ Use POST method for simulation API
async def simulate(request: SimulationRequest):
    """
    Run investment simulation.

    Request Body:
        - investment_amount (float): Initial investment amount.
        - duration (int): Investment period in years.
        - risk_appetite (float): Risk level (0 = low risk, 1 = high risk).
        - market_condition (str): 'bull', 'bear', or 'neutral'.
        - stocks (float): Percentage allocation to stocks.
        - bonds (float): Percentage allocation to bonds.
        - real_estate (float): Percentage allocation to real estate.
        - commodities (float): Percentage allocation to commodities.

    Returns:
        dict: Aggregated simulation results.
    """
    try:
        # ✅ Validate input values
        if request.investment_amount <= 0 or request.duration <= 0:
            raise HTTPException(status_code=400, detail="Investment amount and duration must be greater than zero.")
        
        total_allocation = request.stocks + request.bonds + request.real_estate + request.commodities
        if total_allocation != 100:
            raise HTTPException(status_code=400, detail=f"Total asset allocation must sum to 100%, currently {total_allocation}%.")

        # ✅ Run the simulation with validated inputs
        result = run_simulation(
            investment_amount=request.investment_amount,
            duration=request.duration,
            risk_appetite=request.risk_appetite,
            market_condition=request.market_condition,
            stocks=request.stocks,
            bonds=request.bonds,
            real_estate=request.real_estate,
            commodities=request.commodities
        )

        return {"status": "success", "data": result}

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error: " + str(e))
