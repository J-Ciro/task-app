import {
  IonToolbar,
  IonTitle,
  IonHeader,
  IonContent,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonCheckbox,
  IonLabel,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonFooter,
  IonBadge,
  IonTabs,
} from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonButtons } from '@ionic/angular/standalone';
import { TaskModalComponent } from '../shared/components/task-modal/task-modal.component';
import { add, close, closeCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonSegment,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonButton,
    IonLabel,
    IonIcon,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonSegmentButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    ScrollingModule,
    IonList,
  ],
})
export class TasksPage {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  newTaskTitle = '';
  filterStatus: 'all' | 'completed' | 'pending' = 'all';
  filters = {
    categoryId: null as string | null,
    showCompleted: true,
    showPending: true,
  };
  selectedCategoryId: string | null = null;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private modalCtrl: ModalController
  ) {
    addIcons({ add, closeCircle, close });
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

  compareWithCategory = (o1: string | null, o2: string | null) => {
    return o1 === o2;
  };

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
    const status = this.filterStatus;
    const categoryId = this.selectedCategoryId;
    this.filteredTasks = this.tasks.filter((task) => {
      const statusMatch =
        status === 'all' ||
        (status === 'completed' && task.completed) ||
        (status === 'pending' && !task.completed);
      const categoryMatch = !categoryId || task.categoryId === categoryId;
      return statusMatch && categoryMatch;
    });
  }

  resetCategoryFilter() {
    this.selectedCategoryId = null;
    this.applyFilters();
  }

  resetFilters() {
    this.filters = {
      categoryId: null,
      showCompleted: true,
      showPending: true,
    };
    this.applyFilters();
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: this.newTaskTitle,
        completed: false,
        categoryId: this.selectedCategoryId || null,
      };

      this.taskService.saveTask(newTask);
      this.newTaskTitle = '';
      this.selectedCategoryId = null;
      this.loadData();
    }
  }

  toggleTask(task: Task) {
    this.taskService.toggleTaskCompletion(task.id);
    this.loadData();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.loadData();
  }

  toggleTaskCompletion(taskId: string) {
    this.taskService.toggleTaskCompletion(taskId);
    this.loadData();
  }

  getCategoryName(categoryId: string | null): string {
    if (!categoryId) return 'No Category';
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
