import { Injectable, Input } from '@angular/core';
import { Recipe, RecipeList } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeAverageService {
  constructor() { }

  getRecipeAverage(recipeId: number, recipeComments: any[]) {
    const notes: number[] = [];

    function averageFn(total: number, num: number) {
      return total + num;
    }

    if(recipeId && recipeComments.length >= 1) {
      recipeComments.map((comment) => {
        notes.push(comment.note)
      })
      // console.log(`${recipeId} ---> ${notes}`);

      const sum: number = notes.reduce(averageFn) / recipeComments.length;
      const round = Math.round(sum * 10) / 10;

      return round;
    } else {
      return 0;
    }
  }



  /*getRecipeAverage(id: number, recipeList: RecipeList) {
    function averageFn(total: number, num: number) {
      return total + num;
    }

    const recipe: Recipe[] = recipeList.filter(rcp => rcp.id === id);
    const average = recipe.map((item: any) => {
      const sum = item.opinions.map((elm: any) => elm.starScore).reduce(averageFn) / item.opinions.length;
      const round = Math.round(sum * 10) / 10;
      return round;
    })

    return average[0];
  }*/
}
