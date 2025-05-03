import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/task.model';
import { Category } from '../../../models/category.model';
import {
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCheckbox,
  IonLabel,
  IonFooter,
  IonToast,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  imports: [
    IonToast,
    IonHeader,
    IonItem,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonContent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonLabel,
    CommonModule,
    FormsModule,
    IonFooter,
  ],
})
export class TaskModalComponent {
  @Input() task!: Task;
  @Input() categories: Category[] = [];
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();
  modal: any;

  constructor() {}

  onSave() {
    return this.task;
  }
  onCancel() {
    return null;
  }

  onDelete() {
    return this.task.id;
  }
}
