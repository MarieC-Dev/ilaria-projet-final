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
    function addition(total: number, nb: number) {
      return total + nb;
    }

    const additionHours: Array<number> = [this.preparationHours(), this.cookingHours(), this.pauseHours()];
    const additionMinutes: Array<number> = [this.preparationMinutes(), this.cookingMinutes(), this.pauseMinutes()];

    const sumMinutes: number = additionMinutes.reduce(addition);

    function getMinutesTime(): any {
      if(sumMinutes > 0) {
        if(sumMinutes > 59) {
          const integerMin: number = Math.floor(sumMinutes / 60);
          const decimalMin: number = (sumMinutes / 60) - integerMin;

          additionHours.push(integerMin);
  
          return decimalMin !== 0 ? decimalMin * 60 + ' min' : '';
        } 
        else return `${sumMinutes} min`;
      } 
      else return;
    }

    function getHoursTime(): any {
      if(additionHours.length > 0) {
        const sumHours = additionHours.reduce(addition);

        if(sumHours > 0) {
          return `${sumHours} h `;
        } else return;
      } else return;
    }

    if(getHoursTime() && getMinutesTime()) {
      return getHoursTime() + getMinutesTime();
    } else {
      if(getHoursTime() === undefined) return getMinutesTime();

      if(getMinutesTime() === undefined) return getHoursTime();
    }
  }
}
