import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RecipeItemComponent } from '../../recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../../services/recipe-average.service';
import { RecipeList } from '../../../models/recipe.model';
import { ChevronDownIconComponent } from "../../icons/chevron-down-icon/chevron-down-icon.component";
import { COLORS } from '../../icons/colors';
import { ModifyIconComponent } from "../../icons/modify-icon/modify-icon.component";
import { DeleteIconComponent } from "../../icons/delete-icon/delete-icon.component";
import { SearchIconComponent } from "../../icons/search-icon/search-icon.component";

@Component({
  selector: 'app-myfavorites-myrecipes',
  imports: [CommonModule, RecipeItemComponent, ChevronDownIconComponent, JsonPipe, ModifyIconComponent, DeleteIconComponent, SearchIconComponent],
  templateUrl: './myfavorites-myrecipes.component.html',
  styleUrl: './myfavorites-myrecipes.component.scss'
})
export class MyfavoritesMyrecipesComponent {
  colorsList = signal(COLORS);

  title = input.required<string>();

  isFavorites = input.required<boolean>();
  favoritesArray = input<RecipeList>([]);
  isRecipes = input.required<boolean>();
  recipesArray = input<Array<any>>([]);
  average = inject(RecipeAverageService);

  getAverage(id: number, array: RecipeList) {   
    return this.average.getRecipeAverage(id, array);
  }

}
