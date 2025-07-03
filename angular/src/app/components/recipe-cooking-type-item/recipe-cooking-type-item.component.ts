import {Component, input, Input} from '@angular/core';

@Component({
  selector: 'app-recipe-cooking-type-item',
  imports: [],
  templateUrl: './recipe-cooking-type-item.component.html',
  styleUrl: './recipe-cooking-type-item.component.scss'
})
export class RecipeCookingTypeItemComponent {
  cookingType = input<string>();
}
