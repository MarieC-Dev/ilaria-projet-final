import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-item-time',
  imports: [],
  templateUrl: './recipe-item-time.component.html',
  styleUrl: './recipe-item-time.component.scss'
})
export class RecipeItemTimeComponent {
  preparationHours = input<number>(0);
  preparationMinutes = input<number>(0);

  cookingTime = input<boolean>(false);
  cookingHours = input<number>(0);
  cookingMinutes = input<number>(0);

  pauseTime = input<boolean>(false);
  pauseHours = input<number>(0);
  pauseMinutes = input<number>(0);

  servingNumber = input<number>(0);
  servingUnit = input<string>('');

  getHours(hours: any) {
    return hours > 0 ? hours + ' h' : '';
  }

  getMinutes(minutes: any) {
    return minutes > 0 ? minutes + ' min' : '';
  }

  getTotalTime() {
    const additionHours: number = this.preparationHours() + this.cookingHours() + this.pauseHours();
    const additionMinutes: number = this.preparationMinutes() + this.cookingMinutes() + this.pauseMinutes();

    if(additionMinutes > 59) {
      const divideadditionMinutes = additionMinutes / 60;
      const integerMin: number = Math.floor(additionMinutes / 60);
      const decimalMin: number = divideadditionMinutes - integerMin;

      const sumHours: number = additionHours + integerMin;
      const sumMinutes: number = decimalMin * 60;

      const totalTime = `${sumHours} h ${sumMinutes} min`;

      return totalTime;
    } else {
      return additionMinutes;
    }    
  }
}
