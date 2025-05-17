export type Priority = 'low' | 'medium' | 'high';

export type TodoStatus = 'pending' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  status: TodoStatus | 'all';
  priority: Priority | 'all';
  searchTerm: string;
}