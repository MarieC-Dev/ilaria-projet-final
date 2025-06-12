import {Component, effect, OnInit, signal} from '@angular/core';
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
  recipeFormStatus = signal('');
  cookingTypeControls: any = ['hotPlate', 'stove', 'airFryer', 'barbecue', 'noCooking']

  constructor(private recipesApiService: RecipesApiService) { }

  ngOnInit(): void {
    this.recipeForm = new RecipeFormFactory();

    this.recipeFormStatus.set(this.recipeForm.formGroup.status);

    this.recipeForm.formGroup.statusChanges.subscribe((status) =>
      this.recipeFormStatus.set(status)
    );
  }

  getCheckboxValue(value: string) {
    let cookingTypeControl = this.recipeForm.formGroup.get('cookingType');
    cookingTypeControl?.setValue(value);
  }

  addDetails(detailName: string, arrayList: FormArray, ...fields: string[]): void {
    const detailItem = this.recipeForm.formGroup.get(detailName) as FormGroup;
    let newDetail : { [key: string]: FormControl } = {}; // puis => FormGroup(newDetail)

    fields.forEach(field => {
      newDetail[field] = new FormControl<string>(detailItem.value[field]);
    });

    const detailsGroup = new FormGroup(newDetail);

    if(detailName === 'ingredientDetail') {
      const ingredientValue = detailsGroup.value['name'].trim().toLowerCase();
      detailsGroup.value['name'] = detailsGroup.value['name'].charAt(0).toUpperCase() + detailsGroup.value['name'].slice(1);

      if(detailsGroup.value['quantity'] === '' ||
        detailsGroup.value['quantity'] === '0' ||
        detailsGroup.value['unit'] === '' ||
        detailsGroup.value['name'] === '') {
        this.errorAddIngredient.set('Les 3 champs sont requis');
      } else if (arrayList.value.find((elm: any) => elm.name.trim().toLowerCase() === ingredientValue)) {
        this.errorAddIngredient.set(`L'ingrédient ${detailsGroup.value['name']} existe déjà`);
      } else {
        this.errorAddIngredient.set('');

        arrayList.push(detailsGroup);

        fields.forEach(field => {
          detailItem.patchValue({ [field]: '' });
        });
      }
    }

    if(detailName === 'stepDetail') {
      detailsGroup.value['stepName'] = detailsGroup.value['stepName'].charAt(0).toUpperCase() + detailsGroup.value['stepName'].slice(1);

      if(detailsGroup.value['number'] === '' ||
        detailsGroup.value['number'] === '0' ||
        detailsGroup.value['stepName'] === '') {
        this.errorAddStep.set('Les 2 champs sont requis');
      }
      else if (arrayList.value.find((elm: any) => elm.number === detailsGroup.value['number'])) {
        this.errorAddStep.set(`L'étape ${detailsGroup.value['number']} existe déjà`);
      }
      else {
        this.errorAddStep.set('');

        arrayList.push(detailsGroup);

        fields.forEach(field => {
          detailItem.patchValue({ [field]: '' });
        });
      }
    }
  }

  // dataIndex = ingredientIndex (ingredient-index) || stepIndex (step-index)
  removeRow(event: Event, arrayList: FormArray, dataIndex: string) {
    const element = event.target as HTMLElement;
    const indexElement = element.closest('tr')!.dataset[dataIndex];

    arrayList.removeAt(Number(indexElement));
  }

  get recipeName() {
    return this.recipeForm.formGroup.get('name')?.valid;
  }

  /* INGREDIENTS */
  get ingredientsList(): FormArray {
    return this.recipeForm.formGroup.get('ingredientsList') as FormArray;
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
  /* ===== */

  getErrorMessage() {
    // 'name' + '... message ...'
    // recipeForm.formGroup.get('name')?.valid
  }

  onSubmit() {
    /*this.recipesApiService.createRecipe(this.recipeForm).subscribe((res) => {
      console.log(res);
    })*/

    Object.keys(this.recipeForm.formGroup.controls).forEach(ctrl => {
      const control = this.recipeForm.formGroup.get(ctrl);

      if(control && control?.invalid) {
        console.log(ctrl);
        console.log(control.invalid);
      }
    })

    console.log(this.recipeForm.formGroup.value);
  }
}
