import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalTimeService {

  constructor() { }

  getTotalTimeService(
    preparationHours: number,
    preparationMinutes: number,
    cookingHours: number,
    cookingMinutes: number,
    pauseHours: number,
    pauseMinutes: number
  ) {
    function addition(total: number, nb: number) {
      return total + nb;
    }

    const additionHours: Array<number> = [preparationHours, cookingHours, pauseHours];
    const additionMinutes: Array<number> = [preparationMinutes, cookingMinutes, pauseMinutes];

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
