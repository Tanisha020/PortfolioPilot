import numpy as np 
import pandas as pd
from models.monte_carlo import monte_carlo_simulation
from models.gbm_model import geometric_brownian_motion
from utils.data_loader import load_data

def run_risk_assessment(investment_amount, duration, risk_appetite, market_condition, stocks, bonds, real_estate, commodities):
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
        gbm_result = np.mean(geometric_brownian_motion(asset_investment, mean_return, volatility, duration), axis=0)

        # Aggregate final values
        total_monte_carlo_value += monte_carlo_result
        total_gbm_value += gbm_result
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

    # Compute Risk Score (0-10)
    risk_score = 5 + (avg_volatility * 10) - (avg_max_drawdown * 5)
    if market_condition == "bull":
        risk_score -= 0.5
    elif market_condition == "bear":
        risk_score += 0.5
    risk_score = max(0, min(10, risk_score))  # Ensure within 0-10

    return {
        "Total Profit": round(final_total_value, 2),
        "ROI (%)": round(final_avg_return * 100, 2),
        "Max Drawdown (%)": round(avg_max_drawdown * 100, 2),
        "Volatility Score": round(avg_volatility * 100, 2),
        "Reward to Risk Ratio (Sharpe Ratio)": round(sharpe_ratio, 2),
        "Risk Score": round(risk_score, 1)  # Matches UI 6.8/10 format
    }


