import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { useTodos } from '../hooks/useTodos';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';
import TodoStats from './TodoStats';
import { PlusCircle } from 'lucide-react';

export default function TodoApp() {
  const { 
    todos, 
    filters, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    toggleTodoStatus, 
    updateFilters 
  } = useTodos();
  
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const todosCount = {
    all: todos.length,
    pending: todos.filter(todo => todo.status === 'pending').length,
    completed: todos.filter(todo => todo.status === 'completed').length
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowAddForm(true);
  };

  const handleUpdateTodo = (title: string, description: string, dueDate?: string, priority?: Todo['priority']) => {
    if (editingTodo) {
      updateTodo({
        ...editingTodo,
        title,
        description,
        dueDate,
        priority: priority || 'medium',
      });
      setEditingTodo(null);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        {/* Main container */}
        <div className="grid grid-cols-1 gap-6">
          <TodoStats todos={todos} />

          {/* Add/Edit Form */}
          {showAddForm ? (
            editingTodo ? (
              <TodoForm 
                initialData={editingTodo}
                onSubmit={handleUpdateTodo}
                onCancel={() => {
                  setEditingTodo(null);
                  setShowAddForm(false);
                }}
              />
            ) : (
              <TodoForm 
                onSubmit={addTodo}
                onCancel={() => setShowAddForm(false)}
              />
            )
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-500 transition-colors mb-6"
            >
              <PlusCircle size={20} className="mr-2" />
              <span className="font-medium">Add New Task</span>
            </button>
          )}

          {/* Filters */}
          <TodoFilter 
            filters={filters} 
            onFilterChange={updateFilters}
            todosCount={todosCount}
          />

          {/* Todo List */}
          <TodoList 
            todos={todos}
            onToggle={toggleTodoStatus}
            onDelete={deleteTodo}
            onEdit={handleEditTodo}
          />
        </div>
      </main>
      
      <footer className="bg-white shadow-sm py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
}