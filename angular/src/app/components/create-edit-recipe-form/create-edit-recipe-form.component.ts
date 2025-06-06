import {Component, OnInit, signal} from '@angular/core';
import { CookingTypeComponent } from '../form-components/cooking-type/cooking-type.component';
import { DifficultyComponent } from '../form-components/difficulty/difficulty.component';
import { MultipleInputsComponent } from '../form-components/multiple-inputs/multiple-inputs.component';
import { CUISINE_TYPE } from '../../lists/cuisine-type-list';
import {RecipesApiService} from '../../services/recipes-api.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {COOKING_TYPE_LIST} from '../../lists/cooking-type-list';
import {RecipeFormFactory} from '../../factories/recipe-form.factory';
import {CommonModule} from '@angular/common';
import {TableListComponent} from '../form-components/table-list/table-list.component';

@Component({
  selector: 'app-create-edit-recipe-form',
  imports: [
    CommonModule,
    MultipleInputsComponent,
    CookingTypeComponent,
    DifficultyComponent,
    FormsModule,
    ReactiveFormsModule,
    TableListComponent,
  ],
  templateUrl: './create-edit-recipe-form.component.html',
  styleUrl: './create-edit-recipe-form.component.scss'
})
export class CreateEditRecipeFormComponent implements OnInit{
  recipeForm!: RecipeFormFactory;
  cuisineTypeList = signal(CUISINE_TYPE);
  cookingTypeList = signal(COOKING_TYPE_LIST);
  isCooking = false;
  isPause = false;
  tableHeadIngredient: string[] = ['Quantité', 'Unités', 'Ingrédients'];
  tableHeadStep: string[] = ['N°', 'Description'];
  errorAddIngredient = signal('');
  errorAddStep = signal('');

  constructor(private recipesApiService: RecipesApiService) { }

  ngOnInit(): void {
    this.recipeForm = new RecipeFormFactory();
  }

  addDetails(detailName: string, arrayList: FormArray, ...fields: string[]): void {
    const detailItem = this.recipeForm.formGroup.get(detailName) as FormGroup;
    const newDetail : { [key: string]: FormControl } = {}; // puis => FormGroup(newDetail)

    fields.forEach(field => {
      newDetail[field] = new FormControl<string>(detailItem.value[field]);
    });

    const detailsGroup = new FormGroup(newDetail);

    if(detailName === 'stepDetail') {
      if (arrayList.value.find((elm: any) => elm.number === detailsGroup.value['number'])) { // ou array.some(() => ...)
        this.errorAddStep.set(`L'étape ${detailsGroup.value['number']} existe déjà. Supprimer celle qui existe pour la remplacer ou changez le numéro`);
      } else if(detailsGroup.value['number'] === '' || detailsGroup.value['stepName'] === '') {
        this.errorAddStep.set('Les 2 champs sont requis');
      } else {
        this.errorAddStep.set('');

        arrayList.push(detailsGroup);

        fields.forEach(field => {
          detailItem.patchValue({ [field]: '' });
        });
      }
    }

    // ici
    /*arrayList.push(detailsGroup);

    fields.forEach(field => {
      detailItem.patchValue({ [field]: '' });
    });*/
    // ... |
  }

  /* INGREDIENTS */
  get ingredientsList(): FormArray {
    return this.recipeForm.formGroup.get('ingredientsList') as FormArray;
  }

  removeIngredient() {
    console.log('Remove');
  }
  /* ===== */

  /* STEPS */
  get stepsList() {
    return this.recipeForm.formGroup.get('stepsList') as FormArray;
  }

  get sortedStepsList() {
    const mapList = this.stepsList.controls.map(ctrl => ctrl.value);
    const sortedList = mapList.sort((a, b) => a.number - b.number);
    return sortedList;
  }

  removeStep() {
    console.log('Remove');
  }
  /* ===== */

  onSubmit() {
    /*this.recipesApiService.createRecipe(this.recipeForm).subscribe((res) => {
      console.log(res);
    })*/
    console.log(this.recipeForm);
  }
}
