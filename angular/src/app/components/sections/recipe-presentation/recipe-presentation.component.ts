import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-presentation',
  imports: [CommonModule],
  templateUrl: './recipe-presentation.component.html',
  styleUrl: './recipe-presentation.component.scss'
})
export class RecipePresentationComponent {
  image = input<string>('');
  title = input<string>('');
  description = input<string>('');
  authorName = input<string>('');
  authorRecipesNumber = input<number>();

  cuisineTypeId = input.required<number>();
  cuisineTypeName = input.required<string>();
}
