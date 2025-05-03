import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonBadge as IonBagde,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  standalone: true,
  imports: [
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    IonBagde,
  ],
})
export class TaskFilterComponent {
  @Input() filterStatus: 'all' | 'completed' | 'pending' = 'all';
  @Input() selectedCategoryId: string | null = null;
  @Input() categories: Category[] = [];
  @Output() statusChange = new EventEmitter<'all' | 'completed' | 'pending'>();
  @Output() categoryChange = new EventEmitter<string | null>();
  @Output() clearCategory = new EventEmitter<void>();

  compareWithCategory = (o1: string | null, o2: string | null) => o1 === o2;

  onStatusChange(event: any) {
    setTimeout(() => {
      this.statusChange.emit(event.detail.value);
    }, 0);
  }

  onCategoryChange(event: any) {
    setTimeout(() => {
      this.categoryChange.emit(event.detail.value);
    }, 0);
  }
}
