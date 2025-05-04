import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonItemOptions,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOption,
  IonIcon,
  IonRow,
  IonCol,
  IonContent,
  IonGrid,
} from '@ionic/angular/standalone';
import { Category } from 'src/app/models/category.model';
import { CommonModule } from '@angular/common';
import { create, trash, createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  imports: [
    IonGrid,

    IonCol,
    IonRow,
    IonList,
    IonItemOptions,
    IonItemSliding,
    CommonModule,
    IonItem,
    IonLabel,
    IonItemOption,
    IonIcon,
  ],
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() edit = new EventEmitter<Category>();
  @Output() delete = new EventEmitter<string>();

  trackByCategoryId(index: number, category: Category): string {
    return category.id;
  }

  constructor() {
    addIcons({ create, trash, createOutline, trashOutline });
  }
}
