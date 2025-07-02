import { CommonModule } from '@angular/common';
import {Component, input, OnInit} from '@angular/core';
import {RecipesApiService} from '../../../services/recipes-api.service';
import {RecipeItemTimeComponent} from '../../recipe-item-time/recipe-item-time.component';
import {UsersApiService} from '../../../services/users-api.service';

@Component({
  selector: 'app-recipe-presentation',
  imports: [CommonModule, RecipeItemTimeComponent],
  templateUrl: './recipe-presentation.component.html',
  styleUrl: './recipe-presentation.component.scss'
})
export class RecipePresentationComponent implements OnInit {
  recipeId = input<number>();
  recipeData: any[] = [];
  usersArray: any[] = []

  constructor(
    private recipeApi: RecipesApiService,
    private userApi: UsersApiService
  ) {
  }

  ngOnInit(): void {
    this.recipeApi.getOneRecipe(Number(this.recipeId())).subscribe({
      next: (result) => {
        console.log(result[0]);
        this.recipeData.push(result[0]);
      },
      error: (err) => console.log('Front get one recipe error : ', err)
    })

    this.userApi.getAllUsers().subscribe({
      next: (result) => {
        console.log(result[0]);
        this.usersArray.push(result);
      },
      error: (err) => console.log('Front get one recipe error : ', err)
    })
  }

  getRecipeAuthor(id: number) {
    return this.usersArray.flat().find((user) => user.id === id)
  }
}
