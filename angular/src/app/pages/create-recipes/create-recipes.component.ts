import { Component } from '@angular/core';
import { CreateEditRecipeFormComponent } from '../../components/create-edit-recipe-form/create-edit-recipe-form.component';

@Component({
  selector: 'app-create-recipes',
  imports: [CreateEditRecipeFormComponent],
  templateUrl: './create-recipes.component.html',
  styleUrl: './create-recipes.component.scss'
})
export class CreateRecipesComponent {

}
