import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesPage } from './categories.page';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryListComponent,
    CategoriesPage,
    RouterModule.forChild([{ path: '', component: CategoriesPage }]),
  ],
})
export class CategoriesModule {}
