import { Component, inject, signal } from '@angular/core';
import { ProfileIconComponent } from '../../components/icons/profile-icon/profile-icon.component';
import { HeartIconComponent } from '../../components/icons/heart-icon/heart-icon.component';
import { RecipeIconComponent } from '../../components/icons/recipe-icon/recipe-icon.component';
import { FormInputComponent } from '../../components/form-components/form-input/form-input.component';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeAverageService } from '../../services/recipe-average.service';

@Component({
  selector: 'app-admin-page',
  imports: [ProfileIconComponent, HeartIconComponent, RecipeIconComponent, FormInputComponent, RecipeItemComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  recipesList = signal(RECIPE_LIST);
  lastRecipe = this.recipesList().slice(-1)[0];
  recipeAverage = inject(RecipeAverageService);

  getRecipeAverage(id: number) {   
    return this.recipeAverage.getRecipeAverage(id, this.recipesList().slice(-1));
  }
}
