import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

def arima_forecast(data, order=(2,1,2), forecast_periods=30):
    """
    Fits an ARIMA model and predicts future values.
    
    Parameters:
        data (pd.Series): Historical price data.
        order (tuple): ARIMA model order (p, d, q).
        forecast_periods (int): Number of periods to forecast.

    Returns:
        pd.Series: Forecasted values.
    """
    model = ARIMA(data, order=order)
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=forecast_periods)
    return forecast
