import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-item-time',
  imports: [],
  templateUrl: './recipe-item-time.component.html',
  styleUrl: './recipe-item-time.component.scss'
})
export class RecipeItemTimeComponent {
  icon = input<string>('');
  title = input<string>('');
  text = input<number>();
  unit = input<string>('');
}
