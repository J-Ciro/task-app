import { Component, Input } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonFooter,
  ModalController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    IonFooter,
  ],
})
export class CategoryModalComponent {
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

  @Input() category: Category = {
    id: '',
    name: '',
    color:
      this.colorOptions[Math.floor(Math.random() * this.colorOptions.length)],
  };

  constructor(private modalCtrl: ModalController) {}

  onSave() {
    if (this.category.name?.trim()) {
      this.modalCtrl.dismiss({ ...this.category }, 'save');
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onDelete() {
    this.modalCtrl.dismiss({ ...this.category }, 'delete');
  }
}
