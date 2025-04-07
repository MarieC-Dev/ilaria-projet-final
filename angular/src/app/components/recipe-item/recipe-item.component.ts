import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  imports: [],
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
}
