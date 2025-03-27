import yfinance as yf
import pandas as pd

# ✅ Full List of NIFTY 50 stocks (NSE Tickers)
nifty50_stocks = [
    "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS", "HINDUNILVR.NS",
    "SBIN.NS", "BAJFINANCE.NS", "BHARTIARTL.NS", "KOTAKBANK.NS", "LT.NS", "ASIANPAINT.NS",
    "AXISBANK.NS", "MARUTI.NS", "ULTRACEMCO.NS", "TITAN.NS", "WIPRO.NS", "SUNPHARMA.NS",
    "HCLTECH.NS", "ITC.NS", "M&M.NS", "POWERGRID.NS", "TECHM.NS", "GRASIM.NS", "NTPC.NS",
    "TATASTEEL.NS", "NESTLEIND.NS", "JSWSTEEL.NS", "ADANIPORTS.NS", "COALINDIA.NS", "ONGC.NS",
    "INDUSINDBK.NS", "BAJAJ-AUTO.NS", "HINDALCO.NS", "UPL.NS", "EICHERMOT.NS", "CIPLA.NS",
    "BPCL.NS", "SHREECEM.NS", "BRITANNIA.NS", "DIVISLAB.NS", "DRREDDY.NS", "HEROMOTOCO.NS",
    "TATAMOTORS.NS", "IOC.NS", "BAJAJFINSV.NS", "SBILIFE.NS", "HDFCLIFE.NS", "ICICIPRULI.NS",
    "APOLLOHOSP.NS", "ADANIENT.NS"
]

# ✅ Set time period (last 10 years)
start_date = "2014-03-21"
end_date = "2024-03-21"

# ✅ Fetch stock data
stock_data = {}
for ticker in nifty50_stocks:
    stock = yf.download(ticker, start=start_date, end=end_date)
    stock["Ticker"] = ticker  # Add ticker column
    stock_data[ticker] = stock

# ✅ Combine all data into a single CSV
df_stocks = pd.concat(stock_data.values())
df_stocks.to_csv("./nifty50_stock_data_10y.csv")
print("✅ NIFTY 50 stock data saved successfully!")
