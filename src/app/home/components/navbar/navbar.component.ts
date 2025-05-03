import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { albums, clipboard, fileTray, home } from 'ionicons/icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {
    addIcons({ clipboard, fileTray, home, albums });
  }

  ngOnInit() {}
}
