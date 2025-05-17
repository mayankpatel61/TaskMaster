import React from 'react';
import { TodoFilters, Priority, TodoStatus } from '../types/todo';
import { Search, Filter, Check, X, Clock } from 'lucide-react';

interface TodoFilterProps {
  filters: TodoFilters;
  onFilterChange: (filters: Partial<TodoFilters>) => void;
  todosCount: {
    all: number;
    pending: number;
    completed: number;
  };
}

export default function TodoFilter({ filters, onFilterChange, todosCount }: TodoFilterProps) {
  const statusOptions: { value: TodoStatus | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <Filter size={16} /> },
    { value: 'pending', label: 'Pending', icon: <Clock size={16} /> },
    { value: 'completed', label: 'Completed', icon: <Check size={16} /> },
  ];

  const priorityOptions: { value: Priority | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'All Priorities', color: 'bg-gray-200 text-gray-800' },
    { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {filters.searchTerm && (
            <button
              onClick={() => onFilterChange({ searchTerm: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X size={16} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
          <div className="flex space-x-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange({ status: option.value })}
                className={`flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${
                  filters.status === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1.5">{option.icon}</span>
                {option.label}
                {option.value !== 'all' && (
                  <span className="ml-1 bg-white bg-opacity-20 text-xs px-1.5 rounded-full">
                    {todosCount[option.value]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">Priority</p>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ priority: e.target.value as Priority | 'all' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}