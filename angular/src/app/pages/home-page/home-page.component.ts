import { Component, signal } from '@angular/core';
import { PageSliderComponent } from '../../components/page-slider/page-slider.component';
import { RecipesFilterComponent } from '../../components/layout-elements/recipes-filter/recipes-filter.component';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';

@Component({
  selector: 'app-home-page',
  imports: [PageSliderComponent, RecipesFilterComponent, RecipeItemComponent],
  templateUrl: './home-page.component.html',
  styleUrl: '../../../styles.scss'
})
export class HomePageComponent {
  recipesList = signal(RECIPE_LIST);
  
  getRecipeAverage(id: number) {
    function averageFn(total: number, num: number) {
      return total + num;
    }
    
    const recipe: any =  this.recipesList().filter(rcp => rcp.id === id);
    const average = recipe.map((item: any) => {
      const sum = item.opinions.map((elm: any) => elm.starScore).reduce(averageFn) / item.opinions.length;
      const round = Math.round(sum * 10) / 10;
      return round;
    });
    //const starScore = recipe.map((item: any) => item.opinion.map((elm: any) => elm.starScore).reduce(average));

    return average[0];
  }

}
