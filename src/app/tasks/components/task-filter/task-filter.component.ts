import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonSelect,
  IonButton,
  IonIcon,
  IonBadge,
  IonSelectOption,
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
    IonBadge,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonSelect,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    IonSelectOption,
  ],
})
export class TaskFilterComponent {
  @Input() filterStatus: 'all' | 'completed' | 'pending' = 'all';
  @Input() selectedCategoryId: string | null = null;
  @Input() categories: Category[] = [];
  @Output() filterChange = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<'all' | 'completed' | 'pending'>();
  @Output() categoryChange = new EventEmitter<string | null>();
  @Output() clearCategory = new EventEmitter<void>();

  compareWithCategory = (o1: string | null, o2: string | null) => o1 === o2;

  onStatusChange(event: any) {
    this.statusChange.emit(event.detail.value);
    this.filterChange.emit();
  }

  onCategoryChange(event: any) {
    this.categoryChange.emit(event.detail.value);
    this.filterChange.emit();
  }
}
