from fastapi import APIRouter, HTTPException
from services.simulation_ import run_simulation

router = APIRouter()

@router.get("/")
async def simulate(asset_type: str, initial_value: float, years: int):
    """
    Run investment simulation.

    Query Parameters:
        asset_type (str): 'stocks', 'bonds', 'real_estate', or 'commodities'.
        initial_value (float): Investment amount.
        years (int): Investment duration.

    Returns:
        dict: Simulation results.
    """
    try:
        if initial_value <= 0 or years <= 0:
            raise HTTPException(status_code=400, detail="Initial value and years must be greater than zero.")

        result = run_simulation(asset_type, initial_value, years)
        return {"status": "success", "data": result}
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error: " + str(e))
