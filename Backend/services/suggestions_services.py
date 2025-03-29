import pandas as pd
import numpy as np
from utils.data_loader import load_data
from models.portfolio_optimizer import optimize_stock_allocation, optimize_portfolio

def get_optimized_portfolio(investment, duration, user_allocation, risk_tolerance):
    """
    Loads historical data and runs portfolio optimization based on user inputs.
    Also optimizes stock allocation within the 'Stocks' category.
    """
    try:
        # Load historical data for asset classes
        stock_data = load_data("stocks")
        bond_data = load_data("bonds")
        real_estate_data = load_data("real_estate")
        commodity_data = load_data("commodities")

        # Combine data into a single DataFrame
        data = pd.concat([
            stock_data['Close'],
            bond_data['Close'],
            real_estate_data['Close'],
            commodity_data['Close']
        ], axis=1)

        data.columns = ['Stocks', 'Bonds', 'Real_Estate', 'Commodities']

        # Optimize overall portfolio allocation
        optimized_weights = optimize_portfolio(data, user_allocation, risk_tolerance)
        allocation = {asset: round(weight, 2) for asset, weight in zip(data.columns, optimized_weights)}

        # Calculate investment breakdown based on optimized weights
        investment_breakdown = {asset: weight * investment for asset, weight in allocation.items()}

        # Load historical stock data for fixed 5 stocks
        stock_list = ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA"]
        stock_data = {ticker: load_data(ticker) for ticker in stock_list}

        # Get investment amount for stocks
        stock_investment = investment_breakdown.get("Stocks", 0)

        # Optimize stock allocation within the "Stocks" category
        optimized_stock_allocation = optimize_stock_allocation(stock_data, risk_tolerance,duration)

        # Handle error case if stock optimization fails
        if "error" in optimized_stock_allocation:
            return {"error": "Stock allocation optimization failed."}

        # Convert stock allocation into actual dollar investment
        stock_allocation_investment = {
            stock: round((weight / 100) * stock_investment, 2)
            for stock, weight in optimized_stock_allocation.items()
        }

        return {
            "optimized_allocation": allocation,
            "investment_breakdown": investment_breakdown,
            "optimized_stock_allocation": optimized_stock_allocation,
            "stock_allocation_investment": stock_allocation_investment
        }

    except Exception as e:
        print(f"Error during portfolio optimization: {e}")
        return {"error": "Failed to optimize portfolio. Please check the input data and try again."}