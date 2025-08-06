import {
  MapPinIcon,
  EyeIcon,
  CalendarIcon,
  StarIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

// Mock property data for preview cards
const previewProperties = [
  {
    id: 1,
    name: "Luxury Villa Abuja",
    type: "Villa",
    location: "Abuja, Zone 5",
    rating: 4.8,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    status: "active",
    views: 156,
    bookings: 8,
  },
  {
    id: 2,
    name: "Modern Apartment Complex",
    type: "Apartment",
    location: "Lagos, Victoria Island",
    rating: 4.6,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    status: "active",
    views: 203,
    bookings: 12,
  },
  {
    id: 3,
    name: "Cozy Studio Space",
    type: "Studio",
    location: "Port Harcourt, GRA",
    rating: 4.9,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    status: "active",
    views: 89,
    bookings: 5,
  },
  {
    id: 4,
    name: "Executive Penthouse",
    type: "Penthouse",
    location: "Kano, Nasarawa",
    rating: 4.7,
    reviews: 15,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    status: "inactive",
    views: 67,
    bookings: 3,
  },
  {
    id: 5,
    name: "Family Townhouse",
    type: "Townhouse",
    location: "Ibadan, Bodija",
    rating: 4.5,
    reviews: 22,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    status: "active",
    views: 134,
    bookings: 9,
  },
];

export default function PropertyPreview() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Property Preview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Quick overview of your property listings
          </p>
        </div>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200">
          View All Properties →
        </button>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {previewProperties.map((property) => (
          <div
            key={property.id}
            className="card overflow-hidden hover:shadow-medium transition-shadow duration-300"
          >
            {/* Property Image */}
            <div className="relative">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                  <HeartIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <span
                  className={clsx(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    property.status === "active"
                      ? "bg-success-100 text-success-800"
                      : "bg-warning-100 text-warning-800"
                  )}
                >
                  {property.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-4 space-y-3">
              {/* Title and Type */}
              <div>
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                  {property.name}
                </h3>
                <p className="text-xs text-gray-500">{property.type}</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600 line-clamp-1">
                  {property.location}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium text-gray-900">
                    {property.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({property.reviews} reviews)
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <EyeIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {property.views}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {property.bookings}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button className="w-full bg-gray-100 hover:bg-primary-600 text-gray-700 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 text-xs group">
                  <span>View</span>
                  <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
