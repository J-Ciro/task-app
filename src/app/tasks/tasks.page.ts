import { FirebaseService } from './../services/firebase.service';
import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { TaskModalComponent } from '../shared/components/task-modal/task-modal.component';
import { add, closeCircle, listOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Category } from '../models/category.model';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    CommonModule,
    TaskFilterComponent,
    TaskListComponent,
    IonFab,
    IonRefresher,
    IonRefresherContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  filterStatus: 'all' | 'completed' | 'pending' = 'all';
  selectedCategoryId: string | null = null;
  isAddTaskEnabled = true;

  private featureSubscription: Subscription | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private modalCtrl: ModalController,
    private cdRef: ChangeDetectorRef
  ) {
    addIcons({ listOutline, add, closeCircle });
  }

  async ngOnInit() {
    this.loadData();
    Promise.all([
      this.initializeFeatureFlags(),
      (this.categories = this.categoryService.getCategories()),
    ]);
  }

  private async initializeFeatureFlags() {
    try {
      await this.firebaseService.initializeRemoteConfig();
      this.firebaseService.setupAutoRefresh(300000);
      this.featureSubscription = this.firebaseService
        .watchFeature('add_task_feature_enabled')
        .subscribe((enabled) => {
          this.isAddTaskEnabled = enabled;
          this.cdRef.markForCheck();
        });
    } catch (error) {
      console.error('Failed to initialize Remote Config:', error);
      this.isAddTaskEnabled = true;
    }
  }
  ngOnDestroy() {
    if (this.featureSubscription) {
      this.featureSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.tasks = [...this.taskService.getTasks()].reverse();

    this.categories = this.categoryService
      .getCategories()
      .sort((a, b) => a.name.localeCompare(b.name));

    this.applyFilters();

    this.cdRef.markForCheck();
  }

  async handleRefresh(event: any) {
    const updated = await this.firebaseService.refreshRemoteConfig();
    this.loadData();
    event.target.complete();
    if (updated) {
      console.log('Remote config updated successfully');
    }
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
    this.filterStatus = status;
    this.applyFilters();
  }

  onCategoryChange(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }
}
