import { Component, ChangeDetectorRef } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { TaskModalComponent } from '../shared/components/task-modal/task-modal.component';
import { add, closeCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Category } from '../models/category.model';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonButtons,
    CommonModule,
    TaskFilterComponent,
    TaskListComponent,
  ],
})
export class TasksPage {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  filterStatus: 'all' | 'completed' | 'pending' = 'all';
  selectedCategoryId: string | null = null;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private modalCtrl: ModalController,
    private cdRef: ChangeDetectorRef
  ) {
    addIcons({ add, closeCircle });
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.tasks = this.taskService.getTasks();
    this.categories = this.categoryService
      .getCategories()
      .sort((a, b) => a.name.localeCompare(b.name));
    this.applyFilters();
  }

  async openTaskModal(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: {
        task: task
          ? { ...task }
          : {
              id: Date.now().toString(),
              title: '',
              completed: false,
              categoryId: null,
            },
        categories: this.categories,
      },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (typeof data === 'string') {
        this.taskService.deleteTask(data);
      } else if (data.id) {
        this.taskService.saveTask(data);
      }
      this.loadData();
    }
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      if (
        this.selectedCategoryId &&
        task.categoryId !== this.selectedCategoryId
      ) {
        return false;
      }
      switch (this.filterStatus) {
        case 'completed':
          return task.completed;
        case 'pending':
          return !task.completed;
        default:
          return true;
      }
    });
    this.cdRef.detectChanges();
  }

  resetCategoryFilter() {
    this.selectedCategoryId = null;
    this.applyFilters();
  }

  toggleTaskCompletion(taskId: string) {
    this.taskService.toggleTaskCompletion(taskId);
    this.loadData();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.loadData();
  }

  onFilterStatusChange(status: 'all' | 'completed' | 'pending') {
    setTimeout(() => {
      this.filterStatus = status;
      this.applyFilters();
    }, 0);
  }

  onCategoryChange(categoryId: string | null) {
    setTimeout(() => {
      this.selectedCategoryId = categoryId;
      this.applyFilters();
    }, 0);
  }
}
