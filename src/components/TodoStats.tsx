import React, { useMemo } from 'react';
import { Todo } from '../types/todo';
import { CheckCircle, Circle, AlertTriangle, Percent } from 'lucide-react';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    
    const percentCompleted = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Count by priority
    const byPriority = {
      high: todos.filter(t => t.priority === 'high').length,
      medium: todos.filter(t => t.priority === 'medium').length,
      low: todos.filter(t => t.priority === 'low').length,
    };
    
    // Count overdue tasks
    const overdue = todos.filter(t => {
      if (!t.dueDate || t.status === 'completed') return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDate = new Date(t.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate < today;
    }).length;
    
    return {
      total,
      completed,
      pending,
      percentCompleted,
      byPriority,
      overdue,
    };
  }, [todos]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3">
          <Circle size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3">
          <CheckCircle size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-xl font-bold">{stats.completed}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-3">
          <Percent size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Progress</p>
          <p className="text-xl font-bold">{stats.percentCompleted}%</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="p-3 rounded-full bg-red-100 text-red-600 mr-3">
          <AlertTriangle size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Overdue</p>
          <p className="text-xl font-bold">{stats.overdue}</p>
        </div>
      </div>
    </div>
  );
}