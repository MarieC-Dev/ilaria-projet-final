import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: '../../../styles.scss'
})
export class RecipeItemComponent {
  picture = input.required<string>();
  name = input.required<string>();
  average = input.required<any>();
  numberOfVotes = input.required<number|undefined>();
  authorName = input.required<string>();
}
