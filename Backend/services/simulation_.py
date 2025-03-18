import numpy as np
import pandas as pd
from models.monte_carlo import monte_carlo_simulation
from models.gbm_model import geometric_brownian_motion
from models.arima import arima_forecast
from utils.data_loader import load_data

def run_simulation(asset_type, initial_value, years):
    """
    Runs all three simulation models and averages results.
    
    Parameters:
        asset_type (str): The type of asset ('stocks', 'bonds', 'real_estate', 'commodities').
        initial_value (float): Initial investment.
        years (int): Investment horizon.

    Returns:
        dict: Aggregated simulation results.
    """
    data = load_data(asset_type)
    mean_return = data['Close'].pct_change().mean()
    volatility = data['Close'].pct_change().std()

    # Run simulations
    monte_carlo_result = np.mean(monte_carlo_simulation(initial_value, mean_return, volatility, years))
    gbm_result = np.mean(geometric_brownian_motion(initial_value, mean_return, volatility, years)[-1])
    arima_result = np.mean(arima_forecast(data['Close'], forecast_periods=years * 12))

    final_result = np.mean([monte_carlo_result, gbm_result, arima_result])

    return {
        "Monte Carlo": monte_carlo_result,
        "GBM": gbm_result,
        "ARIMA": arima_result,
        "Final Average": final_result
    }
