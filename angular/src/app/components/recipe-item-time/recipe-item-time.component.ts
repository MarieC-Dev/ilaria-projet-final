import { Component, inject, input } from '@angular/core';
import { TotalTimeService } from '../../services/total-time.service';

@Component({
  selector: 'app-recipe-item-time',
  imports: [],
  templateUrl: './recipe-item-time.component.html',
  styleUrl: './recipe-item-time.component.scss'
})
export class RecipeItemTimeComponent {
  totalTime = inject(TotalTimeService);

  makingHours = input<number>(0);
  makingMinutes = input<number>(0);

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
    return this.totalTime.getTotalTimeService(
      [this.makingHours(),
        this.cookingHours(),
        this.pauseHours()],
      [this.makingMinutes(),
        this.cookingMinutes(),
        this.pauseMinutes()]
    )
  }
}
