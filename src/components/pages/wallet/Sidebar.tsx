import React from "react";
import {
  Building2,
  Calendar,
  Wallet,
  Mail,
  User,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const navigationItems = [
    { icon: Building2, label: "Properties", href: "#", active: false },
    { icon: Calendar, label: "Bookings", href: "#", active: false },
    { icon: Wallet, label: "Wallet", href: "#", active: true },
    { icon: Mail, label: "Inbox", href: "#", active: false },
    { icon: User, label: "My Plan", href: "#", active: false, badge: "Pro" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">Sojourn</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 group ${
                item.active
                  ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={`w-5 h-5 ${
                    item.active
                      ? "text-primary-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.active && (
                <ChevronRight className="w-4 h-4 text-primary-600" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
