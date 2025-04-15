import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalTimeService {

  constructor() { }

  addition(total: number, nb: number) {
    return total + nb;
  }

  getTotalTimeService(hoursArray: Array<number>, minutesArray: Array<number>) {
    const additionHours: Array<number> = hoursArray;
    const additionMinutes: Array<number> = minutesArray;

    let sumMinutes: number = additionMinutes.reduce(this.addition);
    let sumHours: number = additionHours.reduce(this.addition);

    if(sumMinutes > 59) {
      const integerMin: number = Math.floor(sumMinutes / 60);
      const decimalMin: number = (sumMinutes / 60) - integerMin;

      sumHours += integerMin;

      let totalMinutes = decimalMin !== 0 ? decimalMin * 60 + ' min' : '';
      let totalHours = sumHours !== 0 ? sumHours + ' h ' : '';

      return totalHours + totalMinutes;
    } 
    else {
      let totalMinutes = sumMinutes !== 0 ? sumMinutes + ' min' : '00 min';
      let totalHours = sumHours !== 0 ? sumHours + ' h ' : '0 h ';

      return totalHours + totalMinutes;
    }
  }
}
