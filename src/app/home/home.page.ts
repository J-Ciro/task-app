// home.page.ts
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonProgressBar,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { add, time, checkmarkDone, list } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonProgressBar,
    IonFab,
    IonFabButton,
    CommonModule,
    RouterLink,
  ],
})
export class HomePage {
  recentPendingTasks: any[] = [];
  recentCompletedTasks: any[] = [];
  taskStats = {
    total: 0,
    completed: 0,
    pending: 0,
    completionPercentage: 0,
  };

  constructor(private taskService: TaskService) {
    addIcons({ add, time, checkmarkDone, list });
  }

  ionViewWillEnter() {
    this.loadTaskData();
  }

  loadTaskData() {
    const allTasks = this.taskService.getTasks();
    this.recentPendingTasks = allTasks
      .filter((task) => !task.completed)
      .slice(-3)
      .reverse();

    this.recentCompletedTasks = allTasks
      .filter((task) => task.completed)
      .slice(-3)
      .reverse();
    this.taskStats.total = allTasks.length;
    this.taskStats.completed = allTasks.filter((task) => task.completed).length;
    this.taskStats.pending = this.taskStats.total - this.taskStats.completed;
    this.taskStats.completionPercentage =
      this.taskStats.total > 0
        ? Math.round((this.taskStats.completed / this.taskStats.total) * 100)
        : 0;
  }

  toggleTaskCompletion(taskId: string) {
    this.taskService.toggleTaskCompletion(taskId);
    this.loadTaskData();
  }
}
