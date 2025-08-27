import { CommonModule } from '@angular/common';
import {Component, input, OnInit} from '@angular/core';
import {RecipesApiService} from '../../../services/recipes-api.service';
import {RecipeItemTimeComponent} from '../../recipe-item-time/recipe-item-time.component';
import {UsersApiService} from '../../../services/users-api.service';
import {RecipeTimeApiService} from '../../../services/recipe-time-api.service';
import {RecipeDetailsService} from '../../../services/recipe-details.service';
import {ServingNumberApiService} from '../../../services/serving-number-api.service';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-recipe-presentation',
  imports: [CommonModule, RecipeItemTimeComponent],
  templateUrl: './recipe-presentation.component.html',
  styleUrl: './recipe-presentation.component.scss'
})
export class RecipePresentationComponent implements OnInit {
  recipeId = input<number>();
  allRecipeData: any[] = [];
  recipeData!: any;
  usersArray!: any[];
  recipesUser: any[] = [];
  recipeTime!: any[];
  servingNumber!: any[];

  constructor(
    private recipeApi: RecipesApiService,
    private userApi: UsersApiService,
    private recipeTimeApi: RecipeTimeApiService,
    private servingNumberApi: ServingNumberApiService,
    protected recipeDetailService: RecipeDetailsService
  ) { }

  ngOnInit(): void {
    this.recipeApi.getAllRecipes().subscribe({
      next: (result) => {
        this.allRecipeData.push(result);
      },
      error: (err) => console.log('Front get one recipe error : ', err)
    });

    this.userApi.getAllUsers().subscribe({
      next: (result) => {
        this.usersArray = result;
      },
      error: (err) => console.log('Front get users error : ', err)
    });

    this.recipeApi.getOneRecipe(Number(this.recipeId())).pipe(
      switchMap((result: any[]) => {
        this.recipeData = result[0];
        return this.servingNumberApi.getOneServingNumber(result[0].servingNumberId);
      }),
      switchMap((allServing) => {
        const allServingNumber = allServing.result;
        this.servingNumber = allServingNumber.filter((serving: any) => serving.id === this.recipeData.servingNumberId)[0];

        return this.recipeTimeApi.getAllRecipeTime();
      }),
    ).subscribe((result) => {
      const allRecipeTimes = result.rows;
      this.recipeTime = allRecipeTimes.filter((time: any) => time.recipeId === Number(this.recipeId()));
      console.log(this.recipeTime);
    })

    /*this.recipeApi.getOneRecipe(Number(this.recipeId())).subscribe({
      next: (result) => {
        this.recipeData.push(result[0]);
        console.log({recipe: this.recipeData})
      },
      error: (err) => console.log('Front get one recipe error : ', err)
    });

    this.userApi.getAllUsers().subscribe({
      next: (result) => {
        this.usersArray = result;
      },
      error: (err) => console.log('Front get users error : ', err)
    });

    this.recipeTimeApi.getAllRecipeTime().subscribe({
      next: (result) => {
        this.recipeTime = result.rows;
        console.log({time: this.recipeTime})
      },
      error: (err) => console.log('Front get recipes times error : ', err)
    })

    this.servingNumberApi.getAllServingNumber().subscribe({
      next: (result) => {
        this.servingNumber = result.rows;
        console.log({serving: this.servingNumber})
      },
      error: (err) => console.log('Front get serving number error : ', err)
    })*/
  }

  getRecipeAuthor(id: number) {
    return this.usersArray.find((user) => user.id === id)
  }

  getRecipesUser(id: number) {
    return this.allRecipeData[0].filter((recipe: any) => recipe.authorId === id);
  }

  getRecipeTime(id: number) {
    return this.recipeTime.flat().find((time) => time.id === id)
  }

  showRecipeTime(hour: number, min: number) {
    return !(hour === 0 && min === 0);
  }

  getServingNumberData(id: number) {
    return this.servingNumber.find((serving) => serving.id === id);
  }

}
