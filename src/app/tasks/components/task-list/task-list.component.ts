import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  IonList,
  IonItemSliding,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonContent,
  IonToast,
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
    IonContent,
    IonList,
    IonItemSliding,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
    FormsModule,
    ScrollingModule,
    IonList,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() set tasks(value: Task[]) {
    this._allTasks = value;
    this.displayedTasks = this._allTasks.slice(0, this.initialLoadCount);
  }
  @Input() categories: Category[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() toggle = new EventEmitter<string>();

  private _allTasks: Task[] = [];
  displayedTasks: Task[] = [];
  initialLoadCount = 20;
  itemsPerLoad = 10;

  constructor(private cdRef: ChangeDetectorRef) {}

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

  getCategoryName(categoryId: string | null): string {
    if (!categoryId) return 'No Category';
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  loadMore(event: any) {
    setTimeout(() => {
      const currentLength = this.displayedTasks.length;
      const moreTasks = this._allTasks.slice(
        currentLength,
        currentLength + this.itemsPerLoad
      );
      this.displayedTasks = [...this.displayedTasks, ...moreTasks];

      event.target.complete();

      // Deshabilitar si hemos cargado todas las tareas
      if (this.displayedTasks.length >= this._allTasks.length) {
        event.target.disabled = true;
      }

      this.cdRef.detectChanges();
    }, 500);
  }

  refresh() {
    this.displayedTasks = this._allTasks.slice(0, this.initialLoadCount);
    this.cdRef.detectChanges();
  }
}
