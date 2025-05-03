// progress-stats.component.ts
import { Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-stats',
  templateUrl: './progress-stats.component.html',
  styleUrls: ['./progress-stats.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonProgressBar,
    CommonModule,
  ],
})
export class ProgressStatsComponent {
  @Input() stats: {
    total: number;
    completed: number;
    pending: number;
    completionPercentage: number;
  } = {
    total: 0,
    completed: 0,
    pending: 0,
    completionPercentage: 0,
  };
}
