import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {
  newDate = new Date();

  constructor() { }

  formatDate(elm: number) {
    if(elm < 10) {
      return `0${elm}`
    } else if(elm === 0) {
      return '00';
    } else return elm;
  }

  formatMonth(month: number) {
    switch (month) {
      case 0:
        return 'janvier';
        break;
      case 1:
        return 'février';
        break;
      case 2:
        return 'mars';
        break;
      case 3:
        return 'avril';
        break;
      case 4:
        return 'mai';
        break;
      case 5:
        return 'juin';
        break;
      case 6:
        return 'juillet';
        break;
      case 7:
        return 'août';
        break;
      case 8:
        return 'septembre';
        break;
      case 9:
        return 'octobre';
        break;
      case 10:
        return 'novembre';
        break;
      case 11:
        return 'décembre';
        break;
      default: return;
    }
  }

  get datetime() {
    let date = `${this.formatDate(this.newDate.getDate())}/${this.formatDate(this.newDate.getMonth() + 1)}/${this.formatDate(this.newDate.getFullYear())}`;
    let schedules = `${this.formatDate(this.newDate.getHours())}:${this.formatDate(this.newDate.getMinutes())}:${this.formatDate(this.newDate.getSeconds())}`;
    return date + ' - ' + schedules;
  }
}
