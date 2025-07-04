import {Component, inject, Input, input, InputSignal, OnInit, signal} from '@angular/core';
import { RecipeStepComponent } from '../../recipe-step/recipe-step.component';
import { RecipeCommentComponent } from '../../recipe-comment-component/recipe-comment.component';
import { SocialNetworksComponent } from '../../social-networks/social-networks.component';
import { Ingredient, RecipeComment, RecipeStep, RecipeTag } from '../../../models/recipe.model';
import { RecipeAverageService } from '../../../services/recipe-average.service';
import { RECIPE_LIST } from '../../../lists/recipe-list.fake';
import { commonSocial } from '../../../lists/social-networks-list';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {RecipesApiService} from '../../../services/recipes-api.service';
import {IngredientsStepsApiService} from '../../../services/ingredients-steps-api.service';
import {RecipeDetailsService} from '../../../services/recipe-details.service';

@Component({
  selector: 'app-recipe-details',
  imports: [
    RecipeStepComponent,
    RecipeCommentComponent,
    SocialNetworksComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipeId!: number;
  ingredientsList!: any[];
  ingredients!: any[];
  stepsList!: any[];
  steps!: any[];

  recipeAverage = inject(RecipeAverageService);
  recipesList = signal(RECIPE_LIST);
  recipe = this.recipesList()[0];

  recipeOpinions = input<RecipeComment[]>();
  recipeAuthorName = input.required<string>();

  recipeIngredientsList = input.required<Ingredient[]>();

  recipeTags = input.required<RecipeTag[]>();

  socialNetworksList = signal(commonSocial);

  constructor(
    private ingredientsStepsApi: IngredientsStepsApiService,
    protected recipeDetailService: RecipeDetailsService
  ) { }

  ngOnInit(): void {
    this.ingredientsStepsApi.getIngredientsList().subscribe({
      next: (result) => {
        this.ingredientsList = result.rows;
      },
      error: (err) => console.log(err)
    });

    this.ingredientsStepsApi.getAllIngredients().subscribe({
      next: (result) => {
        this.ingredients = result.rows;
      },
      error: (err) => console.log(err)
    });

    this.ingredientsStepsApi.getStepsList().subscribe({
      next: (result) => this.stepsList = result.rows,
      error: (err) => console.log(err)
    });

    this.ingredientsStepsApi.getAllSteps().subscribe({
      next: (result) => this.steps = result.rows,
      error: (err) => console.log(err)
    });
  }

  getIngredientsData(recipeId: number) {
    const recipeItemList = this.ingredientsList.filter((list) => list.recipeId === recipeId);

    return recipeItemList.map((list: any) => {
      return this.ingredients.filter((ingredient) => ingredient.id === list.ingredientId)
    });
  }

  getStepsData(recipeId: number) {
    const recipeItemList = this.stepsList.filter((list) => list.recipeId === recipeId);

    return recipeItemList.map((list: any) => {
      return this.steps.filter((step) => step.id === list.stepId)
    });
  }




  getNumberStep(id: number, steps: RecipeStep[]) {
    const filterById = steps.filter((step: any) => step.id === id);
    return filterById[0].id + 1;
  }

  getClassComment(recipeAuthorName: string, answerAuthorName?: string) {
    if(answerAuthorName) { // [answer] existe -> ANSWER
      if(recipeAuthorName !== answerAuthorName) { // ANSWER user
        return 'recipeComment isAnswer userAnswer';
      } else { // ANSWER author
        return 'recipeComment isAnswer authorAnswer';
      }
    } else { // COMMENT
      return 'recipeComment';
    }
  }

  getAverage(id: number) {
    this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }

}
