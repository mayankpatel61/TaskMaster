import React, { useState, useEffect } from 'react';
import { Todo, Priority } from '../types/todo';
import { Calendar, Clock } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (title: string, description: string, dueDate?: string, priority?: Priority) => void;
  initialData?: Todo;
  onCancel?: () => void;
}

export default function TodoForm({ onSubmit, initialData, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'medium');
  const [error, setError] = useState('');

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
      setPriority(initialData.priority);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      setError('Title is required');
      return;
    }
    
    onSubmit(title.trim(), description.trim(), dueDate || undefined, priority);
    
    if (!isEditing) {
      // Clear form if not editing
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
    }
    
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim() !== '') setError('');
          }}
          placeholder="Task title"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <div className="flex space-x-2">
            {(['low', 'medium', 'high'] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium capitalize transition-colors
                  ${priority === p 
                    ? p === 'low' ? 'bg-blue-500 text-white' 
                    : p === 'medium' ? 'bg-amber-500 text-white' 
                    : 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEditing ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}