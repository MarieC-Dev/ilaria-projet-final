import {Component, signal, inject, OnInit} from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { CommonModule, JsonPipe } from '@angular/common';
import { RecipeItemTimeComponent } from '../../components/recipe-item-time/recipe-item-time.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { commonSocial } from '../../lists/social-networks-list';
import { RecipePresentationComponent } from '../../components/recipe-sections/recipe-presentation/recipe-presentation.component';
import { RecipeDetailsComponent } from '../../components/recipe-sections/recipe-details/recipe-details.component';
import { OtherRecipesComponent } from '../../components/recipe-sections/other-recipes/other-recipes.component';
import {RecipesApiService} from '../../services/recipes-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-details-page',
  imports: [
    RecipePresentationComponent,
    RecipeDetailsComponent,
    RecipeItemTimeComponent,
    OtherRecipesComponent,
    CommonModule,
    JsonPipe
  ],
  templateUrl: './recipe-details-page.component.html',
  styleUrl: './recipe-details-page.component.scss'
})
export class RecipeDetailsPage implements OnInit {
  recipesList = signal(RECIPE_LIST);
  recipe = this.recipesList()[0];

  recipeId: number = 0;
  recipeArray: any[] = [];
  othersRecipes = this.recipesList();
  recipeAverage = inject(RecipeAverageService);
  socialNetworksList = signal(commonSocial);

  constructor(
    private route: ActivatedRoute,
    private recipeApi: RecipesApiService
  ) {
  }

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeApi.getOneRecipe(this.recipeId).subscribe({
      next: (result) => {
        console.log(result[0])
        this.recipeArray.push(result[0]);
      },
      error: (err) => console.log('Front get one recipe error : ', err)
    })
    //Number(this.route.snapshot.paramMap.get('id'));
  }

  getRecipeDetail() {
    return this.recipeArray;
  }


}
