import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ClipboardList size={64} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-500 mb-2">No tasks found</h3>
        <p className="text-gray-400">
          Add a new task or change your filters to see tasks here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}