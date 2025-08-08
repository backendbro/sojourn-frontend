// import React from "react";
// import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

// const BalanceCard = () => {
//   return (
//     <div className="relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800"></div>

//       {/* Animated background pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
//         <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
//       </div>

//       <div className="relative bg-white rounded-xl shadow-soft border border-gray-100 border-0 bg-transparent text-white p-8">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                 <Wallet className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-lg font-medium text-white/90">
//                   Wallet Balance
//                 </h2>
//                 <p className="text-sm text-white/70">
//                   Available for withdrawal
//                 </p>
//               </div>
//             </div>

//             <div className="mb-6">
//               <p className="text-4xl font-bold mb-2">₦4,386.80</p>
//               <p className="text-white/70 text-sm">Last updated: Just now</p>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 backdrop-blur-sm flex items-center space-x-2">
//                 <ArrowUpRight className="w-4 h-4" />
//                 <span>Withdraw</span>
//               </button>

//               <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 backdrop-blur-sm flex items-center space-x-2">
//                 <ArrowDownRight className="w-4 h-4" />
//                 <span>Add Funds</span>
//               </button>
//             </div>
//           </div>

//           {/* Decorative elements */}
//           <div className="hidden lg:block">
//             <div className="w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BalanceCard;

import React from "react";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

const BalanceCard = () => {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, #dc143c, #b01030, #800020)", // crimson to darker crimson/burgundy
          // Tailwind primary-600/700/800 equivalents
        }}
      ></div>

      {/* Animated background pattern */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "8rem",
            height: "8rem",
            backgroundColor: "white",
            borderRadius: "50%",
            transform: "translate(-4rem, -4rem)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "6rem",
            height: "6rem",
            backgroundColor: "white",
            borderRadius: "50%",
            transform: "translate(3rem, 3rem)",
          }}
        ></div>
      </div>

      <div
        style={{
          position: "relative",
          backgroundColor: "transparent",
          borderRadius: "0.75rem",
          padding: "2rem",
          color: "white",
          border: "1px solid transparent",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            {/* Wallet icon + heading */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(6px)",
                  marginRight: "0.75rem",
                }}
              >
                <Wallet
                  style={{ width: "1.5rem", height: "1.5rem", color: "white" }}
                />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "500",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Wallet Balance
                </h2>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Available for withdrawal
                </p>
              </div>
            </div>

            {/* Balance */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                ₦4,386.80
              </p>
              <p
                style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}
              >
                Last updated: Just now
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: "500",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem",
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.3)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.2)")
                }
              >
                <ArrowUpRight style={{ width: "1rem", height: "1rem" }} />
                <span>Withdraw</span>
              </button>

              <button
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  fontWeight: "500",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem",
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)")
                }
              >
                <ArrowDownRight style={{ width: "1rem", height: "1rem" }} />
                <span>Add Funds</span>
              </button>
            </div>
          </div>

          {/* Decorative element */}
          <div style={{ display: "none", lg: { display: "block" } }}>
            <div
              style={{
                width: "8rem",
                height: "8rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                backdropFilter: "blur(6px)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
