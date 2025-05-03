import { ModalController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryModalComponent } from '../shared/components/category-modal/category-modal.component';
import { addIcons } from 'ionicons';
import { create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class CategoriesPage {
  categories: Category[] = [];
  newCategoryName = '';
  editingCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private modalCtrl: ModalController
  ) {
    addIcons({ trash, create });
  }

  ionViewWillEnter() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.categoryService.getCategories();
  }

  async openCategoryModal(category?: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: {
        category: category
          ? { ...category }
          : {
              id: '',
              name: '',
              color: '#33FF57',
            },
      },
    });

    modal.onDidDismiss().then(({ data, role }) => {
      if (role === 'save') {
        this.categoryService.saveCategory(data);
        this.loadCategories();
      } else if (role === 'delete') {
        this.categoryService.deleteCategory(data);
        this.loadCategories();
      }
    });
    await modal.present();
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      const newCategory: Category = {
        id: this.categoryService.generateId(),
        name: this.newCategoryName.trim(),
        color: this.getRandomColor(),
      };

      this.categoryService.saveCategory(newCategory);
      this.newCategoryName = '';
      this.loadCategories();
    }
  }

  startEdit(category: Category) {
    this.editingCategory = { ...category };
  }

  saveEdit() {
    if (this.editingCategory) {
      this.categoryService.saveCategory(this.editingCategory);
      this.editingCategory = null;
      this.loadCategories();
    }
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
    this.loadCategories();
  }

  cancelEdit() {
    this.editingCategory = null;
  }

  private getRandomColor(): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
