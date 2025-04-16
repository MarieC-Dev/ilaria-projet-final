import { Component } from '@angular/core';
import { CreateEditRecipeFormComponent } from '../../components/create-edit-recipe-form/create-edit-recipe-form.component';

@Component({
  selector: 'app-edit-recipe-page',
  imports: [CreateEditRecipeFormComponent],
  templateUrl: './edit-recipe-page.component.html',
  styleUrl: './edit-recipe-page.component.scss'
})
export class EditRecipePageComponent {

}
