import React, { useState } from 'react'
import { 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'

const TransactionTable = ({ searchQuery }) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      paymentType: 'Withdrawal',
      paymentMethod: 'Transfer',
      amount: -547.50,
      date: 'Mon Apr 21 2025',
      status: 'completed',
      reference: 'TXN-001'
    },
    {
      id: 2,
      paymentType: 'Withdrawal',
      paymentMethod: 'Transfer',
      amount: 0.00,
      date: 'Wed Feb 19 2025',
      status: 'pending',
      reference: 'TXN-002'
    },
    {
      id: 3,
      paymentType: 'Withdrawal',
      paymentMethod: 'Transfer',
      amount: -65.70,
      date: 'Tue Feb 18 2025',
      status: 'completed',
      reference: 'TXN-003'
    },
    {
      id: 4,
      paymentType: 'Withdrawal',
      paymentMethod: 'Transfer',
      amount: 0.00,
      date: 'Tue Feb 18 2025',
      status: 'failed',
      reference: 'TXN-004'
    },
    {
      id: 5,
      paymentType: 'Withdrawal',
      paymentMethod: 'Transfer',
      amount: 0.00,
      date: 'Tue Feb 18 2025',
      status: 'completed',
      reference: 'TXN-005'
    },
    {
      id: 6,
      paymentType: 'Booking',
      paymentMethod: 'Card',
      amount: 2000.00,
      date: 'Thu Feb 06 2025',
      status: 'completed',
      reference: 'TXN-006'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-success-100 text-success-800`
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getPaymentTypeIcon = (type) => {
    switch (type) {
      case 'Booking':
        return <ArrowUpRight className="w-4 h-4 text-success-600" />
      case 'Withdrawal':
        return <ArrowDownRight className="w-4 h-4 text-primary-600" />
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredTransactions = transactions.filter(transaction =>
    transaction.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.amount.toString().includes(searchQuery) ||
    transaction.date.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedRows(prev => 
      prev.length === filteredTransactions.length 
        ? [] 
        : filteredTransactions.map(t => t.id)
    )
  }

  return (
    <div className="card overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedRows.length} of {filteredTransactions.length} row(s) selected
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr 
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(transaction.id)}
                    onChange={() => handleRowSelect(transaction.id)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getPaymentTypeIcon(transaction.paymentType)}
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.paymentType}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{transaction.paymentMethod}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-semibold ${
                    transaction.amount > 0 ? 'text-success-600' : 
                    transaction.amount < 0 ? 'text-primary-600' : 'text-gray-600'
                  }`}>
                    ₦{Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(transaction.status)}
                    <span className={getStatusBadge(transaction.status)}>
                      {transaction.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{transaction.date}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 font-mono">{transaction.reference}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-700 px-3">
              Page {currentPage}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-150"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionTable 