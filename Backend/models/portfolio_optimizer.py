import numpy as np
import scipy.optimize as sco

def optimize_portfolio(price_data, user_allocation, risk_tolerance):
    """
    Performs Mean-Variance Portfolio Optimization (MPT) with user preferences.

    :param price_data: DataFrame with historical closing prices.
    :param user_allocation: User-defined initial allocation (list of weights).
    :param risk_tolerance: User's risk preference (0 = low, 1 = high).
    :return: Optimized asset allocation weights in percentage.
    """
    returns = price_data.pct_change().dropna()
    mean_returns = returns.mean()
    cov_matrix = returns.cov()
    num_assets = len(mean_returns)

    # Objective function: Adjust Sharpe Ratio for user risk preference
    def neg_sharpe(weights):
        portfolio_return = np.dot(weights, mean_returns)
        portfolio_volatility = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
        sharpe_ratio = portfolio_return / (portfolio_volatility ** (1 - risk_tolerance))
        return -sharpe_ratio  

    # Constraints: Sum of weights must be 1
    constraints = {'type': 'eq', 'fun': lambda x: np.sum(x) - 1}

    # Bounds: Each weight between 5% and 100% (to ensure all assets get some allocation)
    bounds = tuple((0.05, 1) for _ in range(num_assets))

    # Use user's initial allocation
    initial_weights = np.array(user_allocation)

    # Optimize
    result = sco.minimize(neg_sharpe, initial_weights, bounds=bounds, constraints=constraints)
    
    # Normalize the output weights to percentage
    optimized_weights = result.x / np.sum(result.x)  # Ensure the sum is exactly 1
    
    return optimized_weights * 100  # Convert to percentage
