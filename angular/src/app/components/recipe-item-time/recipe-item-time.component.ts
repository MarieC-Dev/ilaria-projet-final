import { Component, inject, input } from '@angular/core';
import { TotalTimeService } from '../../services/total-time.service';
import {RecipeCookingTypeItemComponent} from '../recipe-cooking-type-item/recipe-cooking-type-item.component';

@Component({
  selector: 'app-recipe-item-time',
  imports: [
    RecipeCookingTypeItemComponent
  ],
  templateUrl: './recipe-item-time.component.html',
  styleUrl: './recipe-item-time.component.scss'
})
export class RecipeItemTimeComponent {
  totalTime = inject(TotalTimeService);

  makingHours = input<number>(0);
  makingMinutes = input<number>(0);

  pauseHours = input<number>(0);
  pauseMinutes = input<number>(0);

  cookingHours = input<number>(0);
  cookingMinutes = input<number>(0);
  cookingType = input<string>();

  servingNumber = input<number>(0);
  servingUnit = input<string>('');

  difficulty = input<string>('');

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

  getServingType(type: string) {
    switch (type) {
      case 'person':
        return 'Personnes(s)';
        break;
      case 'piece':
        return 'Part(s)';
        break;
      case 'liter':
        return 'Litre(s)';
        break;
      case 'cylinders':
        return 'Vérine(s)';
        break;
      default:
        return 'Aucune difficulté renseignée';
    }
  }

  getDifficulty(diff: string) {
    switch (diff) {
      case 'easy':
        return 'Facile';
        break;
      case 'intermediate':
        return 'Moyen';
        break;
      case 'difficult':
        return 'Difficile';
        break;
      default:
        return 'Aucune difficulté renseignée';
    }
  }
}
