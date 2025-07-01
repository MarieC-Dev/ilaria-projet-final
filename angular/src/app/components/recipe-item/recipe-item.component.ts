import {Component, input, output} from '@angular/core';
import { HeartIconComponent } from "../icons/heart-icon/heart-icon.component";
import {FavoriteApiService} from '../../services/favorite-api.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  imports: [HeartIconComponent, RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: '../../../styles.scss'
})
export class RecipeItemComponent {
  id = input<number>();
  picture = input<string>();
  name = input<string>();
  average = input<any>();
  numberOfVotes = input<number|undefined>();
  authorName = input<string>();
  recipeId = input<number>();
  userId = input<number>();

  constructor(private favoriteApi: FavoriteApiService) {
  }

  handleFavorite(event: Event) {
    event.preventDefault();

    const favorite = {
      recipeId: this.recipeId(),
      userId: this.userId()
    }

    this.favoriteApi.addFavorite(favorite).subscribe({
      next: (result) => console.log(result),
      error: (err) => console.log('POST favorite error', err)
    })
  }
}
