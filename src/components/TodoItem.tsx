import React, { useState } from 'react';
import { Todo, Priority } from '../types/todo';
import { formatDate, isOverdue } from '../utils/helpers';
import { Check, Trash2, Edit, Calendar, AlertCircle } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const priorityClasses: Record<Priority, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-red-100 text-red-800',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow p-4 mb-3 border-l-4 transition-all duration-300 ease-in-out
        ${todo.status === 'completed' ? 'border-l-green-500 opacity-70' : 
          todo.priority === 'high' ? 'border-l-red-500' : 
          todo.priority === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'}
        ${isDeleting ? 'opacity-0 transform -translate-x-full' : ''}
      `}
    >
      <div className="flex items-start">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-1 transition-colors
            ${todo.status === 'completed' 
              ? 'bg-green-500 text-white' 
              : 'border-2 border-gray-300 hover:border-green-500'
            }`}
        >
          {todo.status === 'completed' && <Check size={16} />}
        </button>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className={`text-lg font-medium ${todo.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </h3>
            
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityClasses[todo.priority]}`}>
              {todo.priority}
            </span>
          </div>
          
          {todo.description && (
            <p className={`mt-1 text-sm ${todo.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
          
          <div className="mt-2 flex items-center text-xs text-gray-500">
            {todo.dueDate && (
              <div className={`flex items-center mr-4 ${isOverdue(todo.dueDate) && todo.status !== 'completed' ? 'text-red-500' : ''}`}>
                {isOverdue(todo.dueDate) && todo.status !== 'completed' ? (
                  <AlertCircle size={14} className="mr-1" />
                ) : (
                  <Calendar size={14} className="mr-1" />
                )}
                <span>{formatDate(todo.dueDate)}</span>
              </div>
            )}
            
            <div className="text-gray-400">
              Created: {formatDate(todo.createdAt)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-3">
        <button 
          onClick={() => onEdit(todo)}
          className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Edit task"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={handleDelete}
          className="p-1.5 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}