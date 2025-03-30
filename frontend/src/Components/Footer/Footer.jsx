import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#1E1E2E] py-12 border-t border-[#3B3B4F]">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    
                    {/* About Us Section */}
                    <div className="text-center md:text-left max-w-md">
                        <h3 className="text-2xl font-bold text-gray-100 mb-4">About Us</h3>
                        <p className="text-gray-400 leading-relaxed">
                            At <span className="font-semibold text-[#3B82F6]">PortfolioPilot</span>, we provide 
                            powerful investment simulations to help you refine your strategy and minimize risk.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-100 mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-[#3B82F6] transition duration-300">Home</Link></li>
                            <li><Link to="/simulation" className="hover:text-[#3B82F6] transition duration-300">Simulation</Link></li>
                            <li><Link to="/risk-assessment" className="hover:text-[#3B82F6] transition duration-300">Assessment</Link></li>
                            <li><Link to="/suggestion" className="hover:text-[#3B82F6] transition duration-300">Suggestions</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Copyright Section */}
                <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
                    <p>&copy; {new Date().getFullYear()} <span className="font-semibold text-[#3B82F6]">PortfolioPilot</span>. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
