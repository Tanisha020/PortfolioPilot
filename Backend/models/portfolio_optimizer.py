import numpy as np
import pandas as pd

def optimize_portfolio(stock_data, num_portfolios, risk_appetite):
    """
    Performs Mean-Variance Portfolio Optimization using the Markowitz model.
    """
    prices = pd.DataFrame({ticker: data['Close'] for ticker, data in stock_data.items()})
    returns = prices.pct_change().dropna()
    
    mean_returns = returns.mean()
    cov_matrix = returns.cov()
    
    stocks = list(stock_data.keys())
    results = []

    for _ in range(num_portfolios):
        weights = np.random.random(len(stocks))
        weights /= np.sum(weights)  # Normalize to sum to 1

        portfolio_return = np.sum(mean_returns * weights)
        portfolio_volatility = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
        
        sharpe_ratio = portfolio_return / portfolio_volatility if portfolio_volatility > 0 else 0
        if risk_appetite > 0.7:
            sharpe_ratio *= 1.2  # Favor higher returns for risk-takers
        
        results.append({
            "Weights": weights,
            "Return": portfolio_return,
            "Volatility": portfolio_volatility,
            "Sharpe": sharpe_ratio
        })
    
    results_df = pd.DataFrame(results)
    
    max_sharpe_idx = results_df["Sharpe"].idxmax()
    best_portfolio = results_df.iloc[max_sharpe_idx]
    
    best_allocation = {stocks[i]: round(best_portfolio["Weights"][i] * 100, 2) for i in range(len(stocks))}
    
    return {
        "Best Allocation": best_allocation,
        "Expected Return": round(best_portfolio["Return"] * 100, 2),
        "Volatility": round(best_portfolio["Volatility"] * 100, 2),
        "Sharpe Ratio": round(best_portfolio["Sharpe"], 2)
    }
