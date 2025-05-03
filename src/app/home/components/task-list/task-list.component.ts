// task-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonIcon,
    CommonModule,
    ScrollingModule,
  ],
})
export class TaskListComponent {
  @Input() tasks: any[] = [];
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() emptyMessage: string = 'No tasks';
  @Output() toggle = new EventEmitter<string>();
  @Output() taskClick = new EventEmitter<string>();

  onToggleTask(taskId: string) {
    this.toggle.emit(taskId);
  }

  onTaskClick(taskId: string) {
    this.taskClick.emit(taskId);
  }
}
