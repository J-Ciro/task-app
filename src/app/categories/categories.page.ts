import { ModalController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryModalComponent } from '../shared/components/category-modal/category-modal.component';
import { addIcons } from 'ionicons';
import { create, trash } from 'ionicons/icons';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class CategoriesPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  allCategories: Category[] = [];
  displayedCategories: Category[] = [];

  newCategoryName = '';
  editingCategory: Category | null = null;
  private readonly CATEGORY_CHUNK_SIZE = 20;

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
    this.allCategories = this.categoryService.getCategories();
    this.displayedCategories = [];
    this.loadMoreCategories();
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
  }

  loadMoreCategories(event?: any) {
    setTimeout(() => {
      const start = this.displayedCategories.length;
      const end = start + this.CATEGORY_CHUNK_SIZE;
      const newCategories = this.allCategories.slice(start, end);
      this.displayedCategories = [
        ...this.displayedCategories,
        ...newCategories,
      ];

      if (event) {
        event.target.complete();
        if (this.displayedCategories.length >= this.allCategories.length) {
          event.target.disabled = true;
        }
      }
    }, 1);
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
      this.allCategories = this.categoryService.getCategories();
      this.displayedCategories = [...this.allCategories];
      if (this.infiniteScroll) {
        this.infiniteScroll.disabled = true;
      }
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
