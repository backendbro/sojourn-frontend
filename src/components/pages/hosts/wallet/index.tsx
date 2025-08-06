import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import TransactionTable from "./TransactionTable";
import BalanceCard from "./BalanceCard";
import TransactionFilters from "./TransactionFilters";

export default () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600 mt-1">
            Manage your transactions and withdrawals
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <BalanceCard />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Earnings
              </p>
              <p className="text-2xl font-bold text-gray-900">₦2,000.00</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-success-600">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+12.5% from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Withdrawals
              </p>
              <p className="text-2xl font-bold text-gray-900">₦613.20</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-primary-600">
            <ArrowDownRight className="w-4 h-4 mr-1" />
            <span>₦547.50 this month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">₦0.00</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <span>No pending transactions</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by amount, payment type, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && <TransactionFilters />}
      </div>

      {/* Transaction Table */}
      <TransactionTable searchQuery={searchQuery} />
    </div>
  );
};

//export default WalletPage;
