import os
import pandas as pd

# Get the absolute path of the Backend directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")  # Ensure this points to the correct folder

def load_data(asset_type):
    """
    Loads historical data for the given asset type.
    """
    file_paths = {
        "stocks": os.path.join(DATA_DIR, "stock_data_5y.csv"),
        "bonds": os.path.join(DATA_DIR, "bond_data_5y - Copy.csv"),
        "real_estate": os.path.join(DATA_DIR, "real_estate_data_5y - Copy.csv"),
        "commodities": os.path.join(DATA_DIR, "commodity_data_5y - Copy.csv")
    }

    if asset_type not in file_paths:
        raise ValueError(f"Invalid asset type: {asset_type}")

    file_path = file_paths[asset_type]

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"❌ Data file not found: {file_path}")

    return pd.read_csv(file_path)
