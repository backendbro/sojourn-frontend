import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

// Mock data based on the original dashboard
const properties = [
  {
    id: 1,
    name: "Finals",
    type: "Town-House",
    location: "Abuja, Zone 5 5",
    status: "inactive",
    views: null,
    activeFrom: null,
    bookings: 0,
    revenue: "No",
  },
  {
    id: 2,
    name: "Aristocrat Apartments",
    type: "Prime-Inn",
    location: "Abuja, Gana Street 3",
    status: "inactive",
    views: null,
    activeFrom: null,
    bookings: 0,
    revenue: "No",
  },
  {
    id: 3,
    name: "Tom And Jerry",
    type: "Smart-Share",
    location: "Abuja, Missisipi Street 7",
    status: "inactive",
    views: null,
    activeFrom: null,
    bookings: 0,
    revenue: "No",
  },
  {
    id: 4,
    name: "Deluxe Apartments",
    type: "Town-House",
    location: "Abuja, Mississippi St 8",
    status: "active",
    views: 45,
    activeFrom: "Mon Apr 21 2025",
    bookings: 1,
    revenue: "N2K",
  },
];

export default function PropertiesDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("properties");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredProperties.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredProperties.map((p) => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your property listings and track their performance
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab("inspections")}
            className={clsx(
              "py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
              selectedTab === "inspections"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            Inspections
          </button>
          <button
            onClick={() => setSelectedTab("properties")}
            className={clsx(
              "py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
              selectedTab === "properties"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            Properties
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by property"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <FunnelIcon className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === filteredProperties.length &&
                      filteredProperties.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr
                  key={property.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(property.id)}
                      onChange={() => handleRowSelect(property.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={clsx(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        property.status === "active"
                          ? "bg-success-100 text-success-800"
                          : "bg-warning-100 text-warning-800"
                      )}
                    >
                      {property.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {property.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{property.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {property.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {property.views !== null ? property.views : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {property.activeFrom || "Not Active"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {property.bookings}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {property.revenue}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-primary-600 px-6 py-4 border-t border-primary-700 relative overflow-hidden">
          {/* Floating House Vector */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 overflow-hidden">
            <svg
              width="120"
              height="80"
              viewBox="0 0 120 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce-x"
            >
              {/* House Base */}
              <rect x="20" y="40" width="80" height="30" fill="white" rx="2" />
              {/* House Roof */}
              <path d="M15 40L60 15L105 40H95L60 20L25 40H15Z" fill="white" />
              {/* Door */}
              <rect
                x="45"
                y="50"
                width="10"
                height="20"
                fill="white"
                opacity="0.8"
              />
              {/* Windows */}
              <rect
                x="30"
                y="45"
                width="8"
                height="8"
                fill="white"
                opacity="0.6"
                rx="1"
              />
              <rect
                x="82"
                y="45"
                width="8"
                height="8"
                fill="white"
                opacity="0.6"
                rx="1"
              />
              {/* Chimney */}
              <rect
                x="75"
                y="25"
                width="6"
                height="15"
                fill="white"
                opacity="0.7"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="text-sm text-white font-medium">
              {selectedRows.length} of {filteredProperties.length} row(s)
              selected
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="px-3 py-1.5 text-sm text-white bg-primary-700 hover:bg-primary-800 rounded-md cursor-not-allowed transition-colors duration-200 border border-primary-500"
              >
                Previous
              </button>
              <button
                disabled
                className="px-3 py-1.5 text-sm text-white bg-primary-700 hover:bg-primary-800 rounded-md cursor-not-allowed transition-colors duration-200 border border-primary-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
