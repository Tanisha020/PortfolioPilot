import os
import pandas as pd


# Get the absolute path of the Backend directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")  # Ensure this points to the correct folder

def load_data(asset_type):
    """
    Loads historical data for the given asset type or individual stock ticker.
    If asset_type is a stock ticker, extracts only its data from stock_data_5y.csv.
    """
 
    file_paths = {
        "stocks": os.path.join(DATA_DIR, "stock_data_5y.csv"),
        "bonds": os.path.join(DATA_DIR, "bond_data_5y - Copy.csv"),
        "real_estate": os.path.join(DATA_DIR, "real_estate_data_5y - Copy.csv"),
        "commodities": os.path.join(DATA_DIR, "commodity_data_5y - Copy.csv")
    }

  
    if asset_type in file_paths:
        file_path = file_paths[asset_type]

    elif asset_type in ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA"]:  
        stock_file = file_paths["stocks"]  

        if not os.path.exists(stock_file):
            raise FileNotFoundError(f"❌ Stock data file not found: {stock_file}")

        
        df = pd.read_csv(stock_file)

        if "Ticker" not in df.columns:
            raise ValueError("❌ Missing 'Ticker' column in stock data file.")

      
        stock_data = df[df["Ticker"] == asset_type]

        if stock_data.empty:
            raise ValueError(f"❌ No data found for stock: {asset_type}")

        return stock_data.reset_index(drop=True)

    else:
        raise ValueError(f"❌ Invalid asset type: {asset_type}")

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"❌ Data file not found: {file_path}")

    print(f"📂 Loading data from: {file_path}")  
    return pd.read_csv(file_path)
