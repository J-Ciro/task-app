import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonItemOptions,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOption,
  IonIcon,
} from '@ionic/angular/standalone';
import { Category } from 'src/app/models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  imports: [
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
}
