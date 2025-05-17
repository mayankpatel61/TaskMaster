import React from 'react';
import { CheckSquare, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function Header({ isMobileMenuOpen, toggleMobileMenu }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckSquare size={24} className="text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">TaskMaster</h1>
        </div>
        
        <button
          className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <nav className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Calendar</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Settings</a>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Calendar</a>
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Settings</a>
          </div>
        </div>
      )}
    </header>
  );
}