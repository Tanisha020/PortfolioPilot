import numpy as np 
import pandas as pd
from models.monte_carlo import monte_carlo_simulation
from models.gbm_model import geometric_brownian_motion
from utils.data_loader import load_data

def run_simulation(investment_amount, duration, risk_appetite, market_condition, stocks, bonds, real_estate, commodities):
    """
    Runs investment simulation across multiple asset classes and returns key financial metrics.

    Parameters:
        investment_amount (float): Initial investment.
        duration (int): Investment horizon in years.
        risk_appetite (float): Risk level (0 to 1).
        market_condition (str): 'bull', 'bear', or 'neutral'.
        stocks, bonds, real_estate, commodities (float): Asset allocations.

    Returns:
        dict: Key financial metrics including portfolio value, expected return, volatility, Sharpe ratio, and max drawdown.
    """
    asset_classes = {
        "stocks": stocks,
        "bonds": bonds,
        "real_estate": real_estate,
        "commodities": commodities
    }
    
    total_monte_carlo_value = 0
    total_gbm_value = 0
    total_monte_carlo_return = 0
    total_gbm_return = 0
    total_volatility = 0
    total_sharpe_ratio = 0
    total_max_drawdown = 0
    
    num_assets = sum(1 for allocation in asset_classes.values() if allocation > 0)
    
    if num_assets == 0:
        return {"error": "At least one asset must have an allocation greater than 0."}

    for asset, allocation in asset_classes.items():
        if allocation == 0:
            continue

        data = load_data(asset)
        mean_return = data['Close'].pct_change().mean()
        volatility = data['Close'].pct_change().std()
        max_drawdown = (data['Close'].max() - data['Close'].min()) / data['Close'].max()

        # Adjust return based on market condition
        if market_condition == "bull":
            mean_return *= 1.2  # 20% boost in bull market
        elif market_condition == "bear":
            mean_return *= 0.8  # 20% drop in bear market
        
        # Adjust risk based on risk appetite
        volatility *= (1 + risk_appetite)

        # Compute initial investment for this asset
        asset_investment = investment_amount * (allocation / 100)

        # Run simulations
        monte_carlo_result = np.mean(monte_carlo_simulation(asset_investment, mean_return, volatility, duration))
        gbm_result = np.mean(geometric_brownian_motion(asset_investment, mean_return, volatility, duration),axis=0)
        print(f"Monte Carlo Results: {monte_carlo_result}")
        print(f"GBM Results: {gbm_result}")

        # Aggregate final values
        total_monte_carlo_value += monte_carlo_result
        total_gbm_value += gbm_result

        # Aggregate expected returns
        total_monte_carlo_return += (monte_carlo_result / asset_investment) - 1
        total_gbm_return += (gbm_result / asset_investment) - 1
        total_volatility += volatility
        total_max_drawdown += max_drawdown

    # Compute final values and returns
    avg_monte_carlo_return = total_monte_carlo_return / num_assets
    avg_gbm_return = total_gbm_return / num_assets
    final_total_value = (total_monte_carlo_value + total_gbm_value) / 2
    final_avg_return = (avg_monte_carlo_return + avg_gbm_return) / 2
    avg_volatility = total_volatility / num_assets
    avg_max_drawdown = total_max_drawdown / num_assets
    sharpe_ratio = final_avg_return / avg_volatility if avg_volatility > 0 else 0

    return {
        "Monte Carlo Portfolio Value": round(total_monte_carlo_value, 2),
        "Monte Carlo Expected Return (%)": round(avg_monte_carlo_return * 100, 2),
        "GBM Portfolio Value": round(total_gbm_value, 2),
        "GBM Expected Return (%)": round(avg_gbm_return * 100, 2),
        "Final Total Portfolio Value": round(final_total_value, 2),
        "Final Expected Return (%)": round(final_avg_return * 100, 2),
        "Volatility (%)": round(avg_volatility * 100, 2),
        "Sharpe Ratio": round(sharpe_ratio, 2),
        "Max Drawdown (%)": round(avg_max_drawdown * 100, 2)
    }
