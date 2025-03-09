import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-[#1E1E2E] text-white">
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold text-white">
          Test Your Investment Strategies Risk-Free
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Use our advanced simulation tools to optimize your investment strategy before committing real money.
        </p>
        <button className="mt-6 px-6 py-3 bg-[#3B82F6] rounded-md text-lg hover:bg-[#2563EB] transition-colors">
          Start Simulating
        </button>
      </section>

]      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-10">
        <div className="p-6 bg-[#2A2A3A] rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-[#3B82F6]">Investment Strategy Simulation</h3>
          <p className="text-gray-400 mt-2">
            Test different investment scenarios with our advanced simulation tools.
          </p>
          <button className="mt-4 px-4 py-2 bg-[#3B82F6] rounded-md text-sm hover:bg-[#2563EB] transition-colors">
            Try Now →
          </button>
        </div>
        <div className="p-6 bg-[#2A2A3A] rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-[#3B82F6]">Risk & Profit Assessment</h3>
          <p className="text-gray-400 mt-2">
            Analyze risk exposure and potential returns of your strategies.
          </p>
          <button className="mt-4 px-4 py-2 bg-[#3B82F6] rounded-md text-sm hover:bg-[#2563EB] transition-colors">
            Analyze Now →
          </button>
        </div>
        <div className="p-6 bg-[#2A2A3A] rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-[#3B82F6]">AI Portfolio Suggestions</h3>
          <p className="text-gray-400 mt-2">
            Get personalized portfolio recommendations powered by AI.
          </p>
          <button className="mt-4 px-4 py-2 bg-[#3B82F6] rounded-md text-sm hover:bg-[#2563EB] transition-colors">
            Get Suggestions →
          </button>
        </div>
      </section>

      <section className="py-12 text-center">
        <h3 className="text-2xl font-semibold text-white">
          Trusted by Investors
        </h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
          <div className="p-6 bg-[#2A2A3A] rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-gray-300">
              “This platform helped me validate my investment strategies before going live.”
            </p>
            <h4 className="mt-4 font-semibold text-[#3B82F6]">Sarah Chen</h4>
            <p className="text-gray-400">Investment Analyst</p>
          </div>
          <div className="p-6 bg-[#2A2A3A] rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-gray-300">
              “The AI suggestions have been incredibly accurate and helpful.”
            </p>
            <h4 className="mt-4 font-semibold text-[#3B82F6]">Mark Thompson</h4>
            <p className="text-gray-400">Portfolio Manager</p>
          </div>
          <div className="p-6 bg-[#2A2A3A] rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-gray-300">
              “Essential tool for risk assessment and strategy optimization.”
            </p>
            <h4 className="mt-4 font-semibold text-[#3B82F6]">Lisa Rodriguez</h4>
            <p className="text-gray-400">Day Trader</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;