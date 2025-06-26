import { Component } from '@angular/core';
import { CreateEditRecipeFormComponent } from '../../components/create-edit-recipe-form/create-edit-recipe-form.component';
import {Location} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-create-recipes',
  imports: [CreateEditRecipeFormComponent, RouterLink],
  templateUrl: './create-recipes.component.html',
  styleUrl: './create-recipes.component.scss'
})
export class CreateRecipesComponent {
  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
