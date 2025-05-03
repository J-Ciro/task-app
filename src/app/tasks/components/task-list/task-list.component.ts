import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IonList,
  IonItemSliding,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Category } from 'src/app/models/category.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItemSliding,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    CommonModule,
    FormsModule,
    ScrollingModule,
  ],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() categories: Category[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() toggle = new EventEmitter<string>();

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

  getCategoryName(categoryId: string | null): string {
    if (!categoryId) return 'No Category';
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }
}
