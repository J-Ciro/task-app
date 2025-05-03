import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly STORAGE_KEY = 'todo_tasks';
  private tasksCache: Task[] | null = null;
  private lastModified = 0;

  constructor() {
    this.initializeService();
  }

  private initializeService(): void {
    this.getTasks();
    this.checkStorageChanges();
  }

  private checkStorageChanges(): void {
    const initialUpdate = localStorage.getItem(`${this.STORAGE_KEY}_timestamp`);
    this.lastModified = initialUpdate
      ? parseInt(initialUpdate, 10)
      : Date.now();

    setInterval(() => {
      const lastUpdate = localStorage.getItem(`${this.STORAGE_KEY}_timestamp`);
      const lastUpdateTime = lastUpdate ? parseInt(lastUpdate, 10) : 0;

      if (lastUpdateTime > this.lastModified) {
        console.log('External change detected, reloading data');
        const data = localStorage.getItem(this.STORAGE_KEY);
        this.tasksCache = data ? JSON.parse(data) : [];
        this.lastModified = lastUpdateTime;
      }
    }, 1000);
  }

  getTasks(): Task[] {
    if (this.tasksCache === null) {
      const startTime = performance.now();
      const data = localStorage.getItem(this.STORAGE_KEY);
      this.tasksCache = data ? JSON.parse(data) : [];
      console.log(`getTasks() took ${performance.now() - startTime}ms`);
      if (!localStorage.getItem(`${this.STORAGE_KEY}_timestamp`)) {
        this.updateTimestamps();
      }
    }
    return this.tasksCache || [];
  }

  saveTask(task: Task): void {
    const startTime = performance.now();
    const tasks = this.getTasks();
    const existingIndex = tasks.findIndex((t) => t.id === task.id);

    if (existingIndex >= 0) {
      tasks[existingIndex] = task;
    } else {
      tasks.push(task);
    }

    this.updateStorage(tasks);
    console.log(`saveTask() took ${performance.now() - startTime}ms`);
  }

  deleteTask(id: string): void {
    const startTime = performance.now();
    const tasks = this.getTasks().filter((t) => t.id !== id);
    this.updateStorage(tasks);
    console.log(`deleteTask() took ${performance.now() - startTime}ms`);
  }

  toggleTaskCompletion(id: string): void {
    const startTime = performance.now();
    const tasks = this.getTasks();
    const task = tasks.find((t) => t.id === id);

    if (task) {
      task.completed = !task.completed;
      this.updateStorage(tasks);
    }

    console.log(
      `toggleTaskCompletion() took ${performance.now() - startTime}ms`
    );
  }

  private updateStorage(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    this.tasksCache = tasks;
    this.updateTimestamps();
  }

  private updateTimestamps(): void {
    this.lastModified = Date.now();
    localStorage.setItem(
      `${this.STORAGE_KEY}_timestamp`,
      this.lastModified.toString()
    );
  }

  getTaskById(id: string): Task | undefined {
    return this.getTasks().find((t) => t.id === id);
  }

  getFilteredTasks(filterFn: (task: Task) => boolean): Task[] {
    const tasks = this.getTasks();
    const result: Task[] = [];

    for (let i = 0; i < tasks.length; i++) {
      if (filterFn(tasks[i])) {
        result.push(tasks[i]);
      }
    }

    return result;
  }
}
