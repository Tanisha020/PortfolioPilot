import pandas as pd

def load_data(asset_type):
    """
    Loads historical data for the given asset type.

    Parameters:
        asset_type (str): The asset class ('stocks', 'bonds', 'real_estate', 'commodities').

    Returns:
        pd.DataFrame: Historical price data.
    """
    file_paths = {
    "stocks": "Backend/data/stock_data_5y.csv",
    "bonds": "Backend/data/bond_data_5y - Copy.csv",
    "real_estate": "Backend/data/real_estate_data_5y - Copy.csv",
    "commodities": "Backend/data/commodity_data_5y - Copy.csv"
    }


    if asset_type not in file_paths:
        raise ValueError(f"Invalid asset type: {asset_type}")

    return pd.read_csv(file_paths[asset_type])
