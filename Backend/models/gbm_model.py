# import numpy as np

# def geometric_brownian_motion(initial_value, mean_return, volatility, time_horizon, steps_per_year=252):
#     """
#     Simulates asset price using Geometric Brownian Motion.
    
#     Parameters:
#         initial_value (float): Initial investment amount.
#         mean_return (float): Expected annual return.
#         volatility (float): Annual volatility.
#         time_horizon (int): Number of years.
#         steps_per_year (int): Trading days per year.

#     Returns:
#         np.array: Simulated asset price path.
#     """
#     dt = 1 / steps_per_year
#     time_steps = int(time_horizon * steps_per_year)
#     np.random.seed(42)
#     shocks = np.random.normal(loc=0, scale=np.sqrt(dt), size=time_steps)
#     price_path = np.zeros(time_steps + 1)
#     price_path[0] = initial_value

#     for t in range(1, time_steps + 1):
#         price_path[t] = price_path[t - 1] * np.exp((mean_return - 0.5 * volatility**2) * dt + volatility * shocks[t - 1])
    
#     return price_path
import numpy as np

def geometric_brownian_motion(initial_value, mean_return, volatility, time_horizon, steps_per_year=252):
    """
    Simulates asset price using Geometric Brownian Motion and returns yearly values.

    Returns:
        price_path (np.array): Full simulated price path.
        yearly_values (np.array): Extracted yearly values.
    """
    dt = 1 / steps_per_year
    time_steps = int(time_horizon * steps_per_year)
    np.random.seed(42)
    shocks = np.random.normal(0, np.sqrt(dt), size=time_steps)
    price_path = np.zeros(time_steps + 1)
    price_path[0] = initial_value

    for t in range(1, time_steps+1 ):
        price_path[t] = price_path[t - 1] * np.exp((mean_return - 0.5 * volatility**2) * dt + volatility * shocks[t - 1])
    
    # Extract yearly values
    yearly_values = np.array([price_path[min(year * steps_per_year, time_steps )] for year in range(time_horizon)])
  # Ensure correct yearly intervals
    # print("Shape of Yearly Portfolio Values:", yearly_values.shape)
    # print("Final Portfolio Value:", price_path[-1] )
    return price_path[-1], yearly_values  # Return full price path & yearly values
