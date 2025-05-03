import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  imports: [IonItem, IonInput, IonButton, CommonModule, FormsModule],
})
export class CategoryFormComponent {
  @Input() category: Partial<Category> = { name: '', color: '#33FF57' };
  @Input() editing = false;
  @Output() save = new EventEmitter<Category>();
  @Output() cancel = new EventEmitter<void>();
}
