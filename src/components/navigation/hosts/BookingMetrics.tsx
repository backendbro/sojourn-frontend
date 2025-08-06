import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  BuildingOfficeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

// Mock booking metrics data
const bookingMetrics = [
  {
    id: 1,
    title: "Total Bookings",
    value: "1,247",
    change: "+12.5%",
    changeType: "increase",
    comparison: "vs 1,108 last month",
    icon: CalendarIcon,
    color: "blue",
  },
  {
    id: 2,
    title: "Revenue Generated",
    value: "₦8,562,450",
    change: "+8.2%",
    changeType: "increase",
    comparison: "vs ₦7,912,300 last month",
    icon: CurrencyDollarIcon,
    color: "green",
  },
  {
    id: 3,
    title: "Unique Guests",
    value: "892",
    change: "+15.3%",
    changeType: "increase",
    comparison: "vs 774 last month",
    icon: UsersIcon,
    color: "purple",
  },
  {
    id: 4,
    title: "Active Properties",
    value: "12",
    change: "+2",
    changeType: "increase",
    comparison: "vs 10 last month",
    icon: BuildingOfficeIcon,
    color: "orange",
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "green":
      return "bg-green-50 text-green-600 border-green-200";
    case "purple":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "orange":
      return "bg-orange-50 text-orange-600 border-orange-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

export default function BookingMetrics() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Booking Metrics
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Performance overview from account creation to current day
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          <button className="btn-primary flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Create a Listing
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bookingMetrics.map((metric) => (
          <div key={metric.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={clsx(
                  "p-2 rounded-lg border",
                  getColorClasses(metric.color)
                )}
              >
                <metric.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1">
                {metric.changeType === "increase" ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-success-600" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={clsx(
                    "text-sm font-medium",
                    metric.changeType === "increase"
                      ? "text-success-600"
                      : "text-red-600"
                  )}
                >
                  {metric.change}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">
                {metric.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.comparison}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Average Booking Value
          </h3>
          <p className="text-xl font-bold text-gray-900">₦6,875</p>
          <p className="text-xs text-gray-500 mt-1">+5.2% from last month</p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Occupancy Rate
          </h3>
          <p className="text-xl font-bold text-gray-900">78.5%</p>
          <p className="text-xs text-gray-500 mt-1">+3.1% from last month</p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Guest Satisfaction
          </h3>
          <p className="text-xl font-bold text-gray-900">4.8/5</p>
          <p className="text-xs text-gray-500 mt-1">Based on 892 reviews</p>
        </div>
      </div>
    </div>
  );
}
