import numpy as np

def monte_carlo_simulation(initial_value, mean_return, volatility, time_horizon, iterations=10000):
    """
    Monte Carlo simulation to estimate future investment performance.
    
    Parameters:
        initial_value (float): Initial investment amount.
        mean_return (float): Expected annual return (as decimal).
        volatility (float): Expected annual volatility (as decimal).
        time_horizon (int): Number of years.
        iterations (int): Number of simulation paths.

    Returns:
        np.array: Simulated final portfolio values.
    """
    np.random.seed(42)  # For reproducibility
    daily_returns = np.random.normal(mean_return / 252, volatility / np.sqrt(252), (time_horizon * 252, iterations))
    growth_factors = np.exp(daily_returns.cumsum(axis=0))
    return initial_value * growth_factors[-1, :]
