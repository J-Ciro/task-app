import {
  IonHeader,
  IonButton,
  IonFooter,
  IonItem,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonLabel,
  IonIcon,
  IonList,
} from '@ionic/angular/standalone';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  imports: [
    IonHeader,
    IonItem,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonLabel,
    CommonModule,
    FormsModule,
    IonFooter,
  ],
})
export class CategoryModalComponent {
  @Input() category: Category = {
    id: '',
    name: '',
    color: this.getRandomColor(),
  };

  @Output() save = new EventEmitter<Category>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  colorOptions = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F333FF',
    '#33FFF3',
    '#FF33A8',
    '#33A8FF',
    '#A833FF',
    '#FF8C33',
    '#33FFBD',
  ];

  getRandomColor(): string {
    return this.colorOptions[
      Math.floor(Math.random() * this.colorOptions.length)
    ];
  }
}
