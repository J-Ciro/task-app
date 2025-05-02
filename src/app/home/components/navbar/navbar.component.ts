import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { clipboard, copy, ellipsisVertical, fileTray, list } from 'ionicons/icons';
import { HomePage } from "../../home.page";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [IonContent, IonHeader, IonIcon, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar],
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor() { 

    addIcons({clipboard, fileTray});
  }

  ngOnInit() {}

}
