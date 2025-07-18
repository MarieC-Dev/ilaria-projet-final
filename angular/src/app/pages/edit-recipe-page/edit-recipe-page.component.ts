import {Component, OnInit, signal} from '@angular/core';
import { CreateEditRecipeFormComponent } from '../../components/create-edit-recipe-form/create-edit-recipe-form.component';
import {Location} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RecipesApiService} from '../../services/recipes-api.service';
import {RecipeFormFactory} from '../../factories/recipe-form.factory';

@Component({
  selector: 'app-edit-recipe-page',
  imports: [CreateEditRecipeFormComponent],
  templateUrl: './edit-recipe-page.component.html',
  styleUrl: './edit-recipe-page.component.scss'
})
export class EditRecipePageComponent implements OnInit {
  recipeForm!: RecipeFormFactory;
  recipeFormStatus = signal('');

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.recipeForm = new RecipeFormFactory();

    this.recipeFormStatus.set(this.recipeForm.formGroup.status);

    this.recipeForm.formGroup.statusChanges.subscribe((status) =>
      this.recipeFormStatus.set(status)
    );
  }

  goBack() {
    this.location.back();
  }
}
