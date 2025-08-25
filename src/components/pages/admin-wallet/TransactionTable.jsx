// import React, { useState } from "react";
// import {
//   MoreHorizontal,
//   ChevronLeft,
//   ChevronRight,
//   CreditCard,
//   ArrowUpRight,
//   ArrowDownRight,
//   CheckCircle,
//   Clock,
//   XCircle,
// } from "lucide-react";

// const TransactionTable = ({ searchQuery }) => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Sample transaction data
//   const transactions = [
//     {
//       id: 1,
//       paymentType: "Withdrawal",
//       paymentMethod: "Transfer",
//       amount: -547.5,
//       date: "Mon Apr 21 2025",
//       status: "completed",
//       reference: "TXN-001",
//     },
//     {
//       id: 2,
//       paymentType: "Withdrawal",
//       paymentMethod: "Transfer",
//       amount: 0.0,
//       date: "Wed Feb 19 2025",
//       status: "pending",
//       reference: "TXN-002",
//     },
//     {
//       id: 3,
//       paymentType: "Withdrawal",
//       paymentMethod: "Transfer",
//       amount: -65.7,
//       date: "Tue Feb 18 2025",
//       status: "completed",
//       reference: "TXN-003",
//     },
//     {
//       id: 4,
//       paymentType: "Withdrawal",
//       paymentMethod: "Transfer",
//       amount: 0.0,
//       date: "Tue Feb 18 2025",
//       status: "failed",
//       reference: "TXN-004",
//     },
//     {
//       id: 5,
//       paymentType: "Withdrawal",
//       paymentMethod: "Transfer",
//       amount: 0.0,
//       date: "Tue Feb 18 2025",
//       status: "completed",
//       reference: "TXN-005",
//     },
//     {
//       id: 6,
//       paymentType: "Booking",
//       paymentMethod: "Card",
//       amount: 2000.0,
//       date: "Thu Feb 06 2025",
//       status: "completed",
//       reference: "TXN-006",
//     },
//   ];

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-4 h-4 text-success-600" />;
//       case "pending":
//         return <Clock className="w-4 h-4 text-yellow-600" />;
//       case "failed":
//         return <XCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return null;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const baseClasses =
//       "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
//     switch (status) {
//       case "completed":
//         return `${baseClasses} bg-success-100 text-success-800`;
//       case "pending":
//         return `${baseClasses} bg-yellow-100 text-yellow-800`;
//       case "failed":
//         return `${baseClasses} bg-red-100 text-red-800`;
//       default:
//         return `${baseClasses} bg-gray-100 text-gray-800`;
//     }
//   };

//   const getPaymentTypeIcon = (type) => {
//     switch (type) {
//       case "Booking":
//         return <ArrowUpRight className="w-4 h-4 text-success-600" />;
//       case "Withdrawal":
//         return <ArrowDownRight className="w-4 h-4 text-primary-600" />;
//       default:
//         return <CreditCard className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const filteredTransactions = transactions.filter(
//     (transaction) =>
//       transaction.paymentType
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       transaction.paymentMethod
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       transaction.amount.toString().includes(searchQuery) ||
//       transaction.date.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleRowSelect = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     setSelectedRows((prev) =>
//       prev.length === filteredTransactions.length
//         ? []
//         : filteredTransactions.map((t) => t.id)
//     );
//   };

//   return (
//     <div className="card overflow-hidden">
//       {/* Table Header */}
//       <div className="px-6 py-4 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900">
//             Transaction History
//           </h3>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-gray-600">
//               {selectedRows.length} of {filteredTransactions.length} row(s)
//               selected
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left">
//                 <input
//                   type="checkbox"
//                   checked={
//                     selectedRows.length === filteredTransactions.length &&
//                     filteredTransactions.length > 0
//                   }
//                   onChange={handleSelectAll}
//                   className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                 />
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Payment Type
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Payment Method
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Reference
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredTransactions.map((transaction) => (
//               <tr
//                 key={transaction.id}
//                 className="hover:bg-gray-50 transition-colors duration-150"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.includes(transaction.id)}
//                     onChange={() => handleRowSelect(transaction.id)}
//                     className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                   />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center space-x-2">
//                     {getPaymentTypeIcon(transaction.paymentType)}
//                     <span className="text-sm font-medium text-gray-900">
//                       {transaction.paymentType}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="text-sm text-gray-900">
//                     {transaction.paymentMethod}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`text-sm font-semibold ${
//                       transaction.amount > 0
//                         ? "text-success-600"
//                         : transaction.amount < 0
//                         ? "text-primary-600"
//                         : "text-gray-600"
//                     }`}
//                   >
//                     ₦{Math.abs(transaction.amount).toFixed(2)}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center space-x-2">
//                     {getStatusIcon(transaction.status)}
//                     <span className={getStatusBadge(transaction.status)}>
//                       {transaction.status}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="text-sm text-gray-900">
//                     {transaction.date}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="text-sm text-gray-500 font-mono">
//                     {transaction.reference}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                   <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-150">
//                     <MoreHorizontal className="w-4 h-4 text-gray-500" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Table Footer */}
//       <div className="px-6 py-4 border-t border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-gray-700">
//             Showing {filteredTransactions.length} of {transactions.length}{" "}
//             transactions
//           </div>

//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>

//             <span className="text-sm text-gray-700 px-3">
//               Page {currentPage}
//             </span>

//             <button
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-150"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionTable;
import React, { useEffect, useMemo, useState } from "react";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { me, getWalletById } from "../../../http/api";

// PaymentTypes enum (match your backend)
const PaymentTypes = {
  BOOKING: 0,
  WITHDRAWAL: 1,
  REFUND: 2,
};

export default function TransactionTable({ searchQuery = "" }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // load hostId -> wallet -> payments
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const user = await me("hosts");
        if (cancelled) return;
        const id = user && user.host && user.host.id ? user.host.id : null;
        if (!id) return;
        const wallet = await getWalletById(id);
        if (cancelled) return;
        const items = wallet && wallet.payments ? wallet.payments : [];
        setPayments(items);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // helper formatting
  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(v ?? 0);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "completed":
        return `${base} bg-green-100 text-green-800`;
      case "pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "failed":
        return `${base} bg-red-100 text-red-800`;
      default:
        return `${base} bg-gray-100 text-gray-800`;
    }
  };

  const getPaymentTypeIcon = (type) => {
    switch (type) {
      case PaymentTypes.BOOKING:
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case PaymentTypes.WITHDRAWAL:
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  const mapTypeLabel = (type) => {
    switch (type) {
      case PaymentTypes.BOOKING:
        return "Booking";
      case PaymentTypes.WITHDRAWAL:
        return "Withdrawal";
      case PaymentTypes.REFUND:
        return "Refund";
      default:
        return "Unknown";
    }
  };

  // Convert raw payments into table-friendly rows
  const rows = useMemo(() => {
    return payments.map((p) => {
      const rawAmount =
        typeof p.amount === "string" ? Number(p.amount) : Number(p.amount || 0);
      // treat withdrawals as negative amounts for display
      const signedAmount =
        p.paymentType === PaymentTypes.WITHDRAWAL
          ? -Math.abs(rawAmount)
          : rawAmount;

      const booking = p.booking;
      const dateStr =
        booking && booking.checkIn
          ? new Date(booking.checkIn).toDateString()
          : p.createdAt
          ? new Date(p.createdAt).toDateString()
          : "-";

      return {
        id: p.id,
        paymentTypeLabel: mapTypeLabel(p.paymentType),
        paymentMethod:
          p.paymentMethod ||
          (p.paymentType === PaymentTypes.WITHDRAWAL ? "Transfer" : "Card"),
        amount: signedAmount,
        status: p.paymentStatus || "unknown",
        date: dateStr || "-",
        reference: p.id,
        raw: p,
      };
    });
  }, [payments]);

  // filtering
  const filtered = useMemo(() => {
    if (!searchQuery) return rows;
    const q = searchQuery.toLowerCase();
    return rows.filter((r) => {
      return (
        String(r.paymentTypeLabel).toLowerCase().includes(q) ||
        String(r.paymentMethod).toLowerCase().includes(q) ||
        String(r.amount).toLowerCase().includes(q) ||
        String(r.status).toLowerCase().includes(q) ||
        String(r.date).toLowerCase().includes(q) ||
        String(r.reference).toLowerCase().includes(q)
      );
    });
  }, [rows, searchQuery]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows((prev) =>
      prev.length === filtered.length ? [] : filtered.map((r) => r.id)
    );
  };

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Transaction History
          </h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedRows.length} of {filtered.length} row(s) selected
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
                  checked={
                    selectedRows.length === filtered.length &&
                    filtered.length > 0
                  }
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
            {paginated.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(t.id)}
                    onChange={() => handleRowSelect(t.id)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getPaymentTypeIcon(t.raw && t.raw.paymentType)}
                    <span className="text-sm font-medium text-gray-900">
                      {t.paymentTypeLabel}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {t.paymentMethod}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm font-semibold ${
                      t.amount > 0
                        ? "text-green-600"
                        : t.amount < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {formatCurrency(Math.abs(t.amount))}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(t.status)}
                    <span className={getStatusBadge(t.status)}>{t.status}</span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{t.date}</span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 font-mono">
                    {t.reference}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}

            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  {loading
                    ? "Loading transactions..."
                    : "No transactions found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filtered.length} transactions
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-sm text-gray-700 px-3">
              Page {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage >= totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-150"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
