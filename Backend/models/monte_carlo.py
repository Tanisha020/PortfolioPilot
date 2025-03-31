
import numpy as np

def monte_carlo_simulation(initial_value, mean_return, volatility, time_horizon, iterations=10000):
    """
    Monte Carlo simulation to estimate future investment performance with yearly values.

    Returns:
        final_values (np.array): Simulated final portfolio values.
        yearly_values (np.array): Average portfolio values at each year.
    """
    np.random.seed(42)
    daily_returns = np.random.normal(mean_return / 252, volatility / np.sqrt(252), (time_horizon * 252, iterations))
    growth_factors = np.exp(daily_returns.cumsum(axis=0))
    portfolio_values = initial_value * growth_factors  # Shape: (days, iterations)

    yearly_values = portfolio_values[::252, :].mean(axis=1)[:time_horizon]

    


    return portfolio_values[-1, :].mean(), yearly_values  
