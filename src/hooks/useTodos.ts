import { useState, useEffect } from 'react';
import { Todo, TodoFilters, Priority, TodoStatus } from '../types/todo';
import { generateId, sortTodos } from '../utils/helpers';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    priority: 'all',
    searchTerm: '',
  });

  // Load todos from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (
    title: string,
    description: string = '',
    dueDate?: string,
    priority: Priority = 'medium'
  ) => {
    const newTodo: Todo = {
      id: generateId(),
      title,
      description,
      dueDate,
      priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTodos(prevTodos => sortTodos([...prevTodos, newTodo]));
  };

  const updateTodo = (updatedTodo: Todo) => {
    updatedTodo.updatedAt = new Date().toISOString();
    setTodos(prevTodos => 
      sortTodos(prevTodos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      ))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleTodoStatus = (id: string) => {
    setTodos(prevTodos =>
      sortTodos(prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === 'pending' ? 'completed' : 'pending',
              updatedAt: new Date().toISOString(),
            }
          : todo
      ))
    );
  };

  const updateFilters = (newFilters: Partial<TodoFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredTodos = todos.filter(todo => {
    // Filter by status
    if (filters.status !== 'all' && todo.status !== filters.status) {
      return false;
    }
    
    // Filter by priority
    if (filters.priority !== 'all' && todo.priority !== filters.priority) {
      return false;
    }
    
    // Filter by search term
    if (filters.searchTerm && 
        !todo.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !todo.description?.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return {
    todos: filteredTodos,
    filters,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    updateFilters,
  };
}