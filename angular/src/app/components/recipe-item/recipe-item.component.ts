import { Component, input } from '@angular/core';
import { HeartIconComponent } from "../icons/heart-icon/heart-icon.component";

@Component({
  selector: 'app-recipe-item',
  imports: [HeartIconComponent],
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

  handleFavorite(event: Event) {
    event.preventDefault();
  }
}
