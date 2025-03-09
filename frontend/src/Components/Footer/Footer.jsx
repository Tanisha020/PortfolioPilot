import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#2A2A3A] py-12 shadow-lg border-t border-[#3B3B4F]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* About Us Section */}
                    <div className="text-left">
                        <h3 className="text-2xl font-bold text-gray-100 mb-4">About Us</h3>
                        <p className="text-gray-400">
                            At <span className="font-semibold text-xl text-[#3B82F6]">PortfolioPilot</span>, we are dedicated to helping you optimize your investment strategies risk-free. Our advanced simulation tools and AI-driven insights empower you to make informed decisions.
                        </p>
                    </div>

                    <div className="text-right">
                        <h3 className="text-2xl font-bold text-gray-100 mb-4">Follow Us</h3>
                        <div className="flex justify-end">
                            <span
                                className="text-gray-400 hover:text-[#3B82F6] transition duration-300 cursor-pointer"
                                aria-label="GitHub"
                            >
                                <FaGithub className="h-6 w-6" />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-400">
                    <p>Made with ❤ by <span className="font-semibold text-[#3B82F6] text-xl">JuniHers Group 8</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;