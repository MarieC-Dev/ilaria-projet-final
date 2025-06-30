import { CommonModule, JsonPipe } from '@angular/common';
import {Component, inject, input, OnInit, signal} from '@angular/core';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { RecipeList } from '../../models/recipe.model';
import { ChevronDownIconComponent } from "../icons/chevron-down-icon/chevron-down-icon.component";
import { COLORS } from '../icons/colors';
import { ModifyIconComponent } from "../icons/modify-icon/modify-icon.component";
import { DeleteIconComponent } from "../icons/delete-icon/delete-icon.component";
import { SearchIconComponent } from "../icons/search-icon/search-icon.component";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FavoritesApiService} from '../../services/favorites-api.service';
import {RecipesApiService} from '../../services/recipes-api.service';
import {UsersApiService} from '../../services/users-api.service';

@Component({
  selector: 'app-myfavorites-myrecipes',
  imports: [CommonModule, RecipeItemComponent, ChevronDownIconComponent, JsonPipe, ModifyIconComponent, DeleteIconComponent, SearchIconComponent, RouterLink],
  templateUrl: './myfavorites-myrecipes.component.html',
  styleUrl: './myfavorites-myrecipes.component.scss'
})
export class MyfavoritesMyrecipesComponent implements OnInit {
  title = input.required<string>();
  isFavorites = input.required<boolean>();
  favoritesArray = input<RecipeList>([]);
  isRecipes = input.required<boolean>();
  recipesArray = input<Array<any>>([]);

  userId!: number;
  username: string = '';
  userFavoritesList: any[] = [];
  recipesListApi: any[] = [];
  average = inject(RecipeAverageService);

  constructor(
    private route: ActivatedRoute,
    private favoritesApi: FavoritesApiService,
    private recipeApi: RecipesApiService,
    private userApi: UsersApiService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.favoritesApi.getAllUserFavorites(this.userId).subscribe({
      next: (result) => {
        this.userFavoritesList = result.rows;
      },
      error: (err) => console.log('get favotites list error ' + err)
    });

    this.recipeApi.getAllRecipes().subscribe({
      next: (result) => {
        this.recipesListApi = result;
      },
      error: (err) => console.log('get recipes list error ' + err)
    });

    this.userApi.getOneUser(this.userId).subscribe({
      next: (result) => {
        this.username = result.profile[0].username;
      },
      error: (err) => console.log('get user data error ' + err)
    })
  }

  getUserFavorites() {
    const favoriteRecipes: any[] = [];
    const favoriteIds = this.userFavoritesList.filter((item) => item.userId === this.userId);

    favoriteIds.map((fav) => {
      const recipes = this.recipesListApi.filter((recipe) => recipe.id === fav.recipeId);
      favoriteRecipes.push(recipes);
    });

    return favoriteRecipes.flat();
  }

  getAverage(id: number, array: RecipeList) {
    return this.average.getRecipeAverage(id, array);
  }



}
