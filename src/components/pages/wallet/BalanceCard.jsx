import React from "react";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

const BalanceCard = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
      </div>

      <div className="relative bg-white rounded-xl shadow-soft border border-gray-100 border-0 bg-transparent text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-white/90">
                  Wallet Balance
                </h2>
                <p className="text-sm text-white/70">
                  Available for withdrawal
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">₦1,386.80</p>
              <p className="text-white/70 text-sm">Last updated: Just now</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 backdrop-blur-sm flex items-center space-x-2">
                <ArrowUpRight className="w-4 h-4" />
                <span>Withdraw</span>
              </button>

              <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 backdrop-blur-sm flex items-center space-x-2">
                <ArrowDownRight className="w-4 h-4" />
                <span>Add Funds</span>
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
