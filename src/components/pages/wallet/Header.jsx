import React from 'react'
import { 
  ChevronDown, 
  Globe, 
  Menu, 
  Bell,
  Settings,
  User
} from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Currency Selector */}
          <div className="relative">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <span className="text-sm font-medium text-gray-900">NGN (₦)</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">EN</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Go to Guest Button */}
          <button className="btn-secondary text-sm">
            Go to Guest
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {/* User Profile */}
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
          </button>

          {/* Relaunch Button */}
          <button className="btn-primary text-sm">
            Relaunch to update
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 