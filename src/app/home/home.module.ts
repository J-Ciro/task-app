import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { ProgressStatsComponent } from './components/progress-stats/progress-stats.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressStatsComponent,
    TaskListComponent,
    HomePage,
    RouterModule.forChild([{ path: '', component: HomePage }]),
  ],
})
export class HomeModule {}
