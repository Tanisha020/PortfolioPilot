import pandas as pd
from models.portfolio_optimizer import optimize_portfolio
from utils.data_loader import load_data

def get_optimized_portfolio(investment, duration, user_allocation, risk_tolerance):
    """
    Loads historical data and runs portfolio optimization based on user inputs.
    """
    # Load historical data
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

    # Run MPT optimization with user inputs
    optimized_weights = optimize_portfolio(data, user_allocation, risk_tolerance)

    # Convert weights into percentage
    allocation = {asset: round(weight, 2) for asset, weight in zip(data.columns, optimized_weights)}
    
    return allocation
