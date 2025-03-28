import numpy as np
import pandas as pd
from models.monte_carlo import monte_carlo_simulation
from models.gbm_model import geometric_brownian_motion
from models.portfolio_optimizer import optimize_portfolio  
from utils.data_loader import load_data
from itertools import combinations_with_replacement

def run_simulation(investment_amount, duration, risk_appetite, market_condition, stocks, bonds, real_estate, commodities):
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

    recommended_stocks = []
    
    for asset, allocation in asset_classes.items():
        if allocation == 0:
            continue

        asset_investment = investment_amount * (allocation / 100)

        
        if asset == "stocks":
            stock_list = ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA"]
            stock_data = {ticker: load_data(ticker) for ticker in stock_list}

            for ticker, data in stock_data.items():
                if data is None or data.empty:
                    print(f"Error: Data for {ticker} is missing or empty!")
            optimized_result = optimize_portfolio(stock_data, 1000, risk_appetite)
            print("Optimized Portfolio:", optimized_result)  
            best_allocation = optimized_result["Best Allocation"]
            recommended_stocks = [{"Ticker": stock, "Allocation (%)": alloc} for stock, alloc in best_allocation.items()]


        data = load_data(asset)
        mean_return = data['Close'].pct_change().mean()
        volatility = data['Close'].pct_change().std()
        max_drawdown = (data['Close'].max() - data['Close'].min()) / data['Close'].max()

        monte_carlo_result = monte_carlo_simulation(asset_investment, mean_return, volatility, duration)
        gbm_result = geometric_brownian_motion(asset_investment, mean_return, volatility, duration)

        total_monte_carlo_value += np.mean(monte_carlo_result)
        total_gbm_value += np.mean(gbm_result)
        total_monte_carlo_return += (np.mean(monte_carlo_result) / asset_investment) - 1
        total_gbm_return += (np.mean(gbm_result) / asset_investment) - 1
        total_volatility += volatility
        total_max_drawdown += max_drawdown

    avg_monte_carlo_return = total_monte_carlo_return / num_assets
    avg_gbm_return = total_gbm_return / num_assets
    final_total_value = (total_monte_carlo_value + total_gbm_value) / 2
    final_avg_return = (avg_monte_carlo_return + avg_gbm_return) / 2
    avg_volatility = total_volatility / num_assets
    avg_max_drawdown = total_max_drawdown / num_assets
    sharpe_ratio = final_avg_return / avg_volatility if avg_volatility > 0 else 0

    return {
        "Final Total Portfolio Value": round(final_total_value, 2),
        "Final Expected Return (%)": round(final_avg_return * 100, 2),
        "Volatility (%)": round(avg_volatility * 100, 2),
        "Sharpe Ratio": round(sharpe_ratio, 2),
        "Max Drawdown (%)": round(avg_max_drawdown * 100, 2),
        "Recommended Stocks": recommended_stocks[:5]  # Display only top 5 stocks
    }
