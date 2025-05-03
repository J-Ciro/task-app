import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly STORAGE_KEY = 'todo_categories';

  constructor() {}

  getCategories(): Category[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveCategory(category: Category): void {
    const categories = this.getCategories();
    const existingIndex = categories.findIndex(c => c.id === category.id);
    
    if (existingIndex >= 0) {
      categories[existingIndex] = category;
    } else {
      categories.push(category);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
  }

  deleteCategory(id: string): void {
    const categories = this.getCategories().filter(c => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}