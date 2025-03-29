import pandas as pd
import numpy as np
from utils.data_loader import load_data
from models.portfolio_optimizer import optimize_stock_allocation, optimize_portfolio
from models.monte_carlo import monte_carlo_simulation
from models.gbm_model import geometric_brownian_motion
from utils.data_loader import load_data
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
          # Simulations using Monte Carlo & GBM
        total_monte_carlo_value = 0
        total_gbm_value = 0
        total_monte_carlo_return = 0
        total_gbm_return = 0
        total_volatility = 0
        total_max_drawdown = 0
        # Load historical stock data for fixed 5 stocks
        stock_list = ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA"]
        stock_data = {ticker: load_data(ticker) for ticker in stock_list}
     
        # Get investment amount for stocks
        stock_investment = investment_breakdown.get("Stocks", 0)

        # portfolio_returns = data.pct_change().dropna()
        # expected_return = np.mean(np.dot(portfolio_returns, optimized_weights)) * 100
        # if portfolio_returns.max().max() > 1:  # If values are in % instead of decimal
        #     portfolio_returns /= 100

        # volatility = np.std(np.dot(portfolio_returns, optimized_weights)) * np.sqrt(252) * 100
        
        # risk_free_rate = 5  # Assume 5% annual risk-free rate
        # sharpe_ratio = (expected_return - risk_free_rate) / volatility if volatility != 0 else 0
        # diversification_score = 1 / np.sum(np.square(optimized_weights))  # HHI score
       
        
        returns = data.pct_change().dropna()

        if returns.max().max() > 1:
            returns = returns / 100  
        risk_free_rate = 5  # Assume 5% annual risk-free rate
        expected_return = np.dot(returns.mean(), optimized_weights) *  100  # Convert to %
        cov_matrix = returns.cov()
        volatility = np.sqrt(np.dot(optimized_weights.T, np.dot(cov_matrix, optimized_weights))) * np.sqrt(252) * 100

        sharpe_ratio = (expected_return - risk_free_rate / 100) / volatility if volatility > 0 else 0
        diversification_score = 1 / np.sum(np.square(optimized_weights)) if np.sum(np.square(optimized_weights)) != 0 else 0

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
        suggestions = []

        if expected_return < 7:
            suggestions.append({
                "title": "Boost Expected Returns",
                "content": "Your portfolio's expected return is below market average (~7-10%). Adjust allocations for better growth potential."
            })

        if volatility > 25:
            suggestions.append({
                "title": "Reduce Portfolio Risk",
                "content": "Your portfolio has high volatility (>25%). Consider adding bonds or defensive stocks to stabilize performance."
            })

        if sharpe_ratio < 1:
            suggestions.append({
                "title": "Improve Risk-Adjusted Returns",
                "content": "Your Sharpe Ratio is below 1, indicating low return for risk taken. Consider adjusting asset allocation to improve efficiency."
            })

        if diversification_score < 0.05:
            suggestions.append({
                "title": "Increase Diversification",
                "content": "Your portfolio is heavily concentrated in a few assets. Consider reallocating to improve risk-adjusted returns."
            })

        return {
            "optimized_allocation": allocation,
            "investment_breakdown": investment_breakdown,
            "optimized_stock_allocation": optimized_stock_allocation,
            "stock_allocation_investment": stock_allocation_investment,
            "portfolio_metrics": {
                "Expected Return (%)": round(expected_return, 2),
                "Risk (Volatility %)": round(volatility, 2),
                "Sharpe Ratio": round(sharpe_ratio, 2),
                "Diversification Score": round(diversification_score, 2)
            },
            "insights": suggestions
        }

    

    except Exception as e:
        print(f"Error during portfolio optimization: {e}")
        return {"error": "Failed to optimize portfolio. Please check the input data and try again."}