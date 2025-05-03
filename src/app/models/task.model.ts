export interface Task {
    id: string;
    title: string;
    completed: boolean;
    categoryId?: string | null;
    dueDate?: Date; 
  }