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
    
@router.post("/")
async def simulate(request: SimulationRequest):
    try:
        print("Received Request:", request.dict())  # Print input values
        
        if request.investment_amount <= 0 or request.duration <= 0:
            print("Invalid investment amount or duration")
            raise HTTPException(status_code=400, detail="Investment amount and duration must be greater than zero.")
        
        if request.risk_appetite < 0 or request.risk_appetite > 1:
            print("Invalid risk appetite:", request.risk_appetite)
            raise HTTPException(status_code=400, detail="Risk appetite must be between 0 and 1.")
            
        if request.market_condition not in ["bull", "bear", "neutral"]:
            print("Invalid market condition:", request.market_condition)
            raise HTTPException(status_code=400, detail="Market condition must be 'bull', 'bear', or 'neutral'.")
        
        total_allocation = request.stocks + request.bonds + request.real_estate + request.commodities
        if abs(total_allocation - 100) > 0.01:
            print("Invalid allocations: Sum =", total_allocation)
            raise HTTPException(status_code=400, detail=f"Total asset allocation must sum to 100%, currently {total_allocation}%.")

        # Run the simulation
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

        print("Simulation Result:", result)  # Debug the output

        if "error" in result:
            print("Simulation failed with error:", result["error"])
            raise HTTPException(status_code=400, detail=result["error"])

        return {"status": "success", "data": result}

    except Exception as e:
        print("Unhandled error:", str(e))
        raise HTTPException(status_code=500, detail="Internal server error: " + str(e))

