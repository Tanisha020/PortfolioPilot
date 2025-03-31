# 🚀 PortfolioPilot

PortfolioPilot is an **investment strategy simulator** . It empowers users to **simulate investment strategies, assess risk and profit, and receive data-driven portfolio suggestions** based on historical data.

## 🌟 Features

### 📊 Investment Strategy Simulation
🔹 Users can input various parameters to simulate investment outcomes.

✅ **Input Parameters:**
-  Investment Amount
-  Duration (in years)
-  Risk Appetite (slider)
-  Market Condition (Bull/Bear/Neutral)
-  Asset Allocation (Stocks, Bonds, Real Estate, Commodities)
- ▶ "Simulate Strategy" button

📌 **Simulation Results:**
-  Portfolio Performance Graph
-  Expected Return (%)
-  Volatility (%)
-  Sharpe Ratio
-  Max Drawdown (%)
-  Projected Final Value (INR)

### 🔍 Risk & Profit Assessment
- 🏦 Analyzes risk exposure and profitability of investment strategies.

### 📌 Portfolio Suggestions Page
🔸 Offers asset optimization and data-driven recommendations for users' portfolios.

## 🚀 Installation

**1. Clone the repository:**
 
   git clone https://github.com/Tanisha020/PortfolioPilot
   
**2. Navigate to the project directory then to frontend and backend directory in splited terminals:**
  
   cd PortfolioPilot
   
   cd frontend
   
   cd Backend
   
**3. Install dependencies in frontend & backend:**


# Install frontend dependencies
npm install 

# Install backend dependencies
python -m venv venv 

venv\Scripts\activate

pip install -r requirements.txt


## 🛠 Usage

**Run the project with:**


# Start Frontend 
npm run dev

# Start Backend
uvicorn main:app --reload


## ⚙️ Configuration

Set up environment variables in a .env file:

### Backend .env File:


DATABASE_URL = "your_database_url_here"

JWT_SECRET=your_super_secret_key_here

NEON_API_KEY= your_neon_api_key_here

NEON_PROJECT_ID = your project id


### Frontend .env File:


VITE_URL=http://127.0.0.1:8000




## 🎉 Credits

- [Ashmika Verma](https://github.com/username)
- [Tanisha Chawala](https://github.com/username)
- [Ayanna Mondol](https://github.com/username)
- [Ganta Devi Abhijna](https://github.com/username)

## 📬 Mentor 
Ankit Raj
