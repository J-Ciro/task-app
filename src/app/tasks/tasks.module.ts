import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksPage } from './tasks.page';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskListComponent,
    TaskFilterComponent,
    TasksPage,
    RouterModule.forChild([{ path: '', component: TasksPage }]),
  ],
})
export class TasksModule {}
