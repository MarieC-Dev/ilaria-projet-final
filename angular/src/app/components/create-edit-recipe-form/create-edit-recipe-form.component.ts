import {Component, effect, inject, OnInit, signal} from '@angular/core';
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
import {HttpEventType} from '@angular/common/http';
import {DatetimeService} from '../../services/datetime.service';
import {AccountAccessService} from '../../services/account-access.service';
import {switchMap, tap} from 'rxjs';

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
  isCooking = false;
  isPause = false;
  tableHeadIngredient: string[] = ['Quantité', 'Unités', 'Ingrédients'];
  tableHeadStep: string[] = ['N°', 'Description'];
  errorAddIngredient = signal('');
  errorAddStep = signal('');
  recipeFormStatus = signal('');
  arrayInvalidControl: string[] = [];
  authorIdValue: number = 0;
  createdDate = inject(DatetimeService);

  constructor(private accountAccess: AccountAccessService, private recipesApiService: RecipesApiService) {
    this.accountAccess.isLoggedIn().subscribe({
      next: (result) => this.authorIdValue = result.user.id,
      error: (err) => console.log(err)
    });
  }

  ngOnInit(): void {
    this.recipeForm = new RecipeFormFactory();

    this.recipeFormStatus.set(this.recipeForm.formGroup.status);

    this.recipeForm.formGroup.statusChanges.subscribe((status) =>
      this.recipeFormStatus.set(status)
    );

    //console.log(this.recipeForm.formGroup.get('authorId')?.value);
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
      detailsGroup.patchValue({
        name: detailsGroup.value['name'].toLowerCase().charAt(0).toUpperCase() + detailsGroup.value['name'].slice(1),
      });

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
      let i: number = 0;
      detailsGroup.patchValue({
        number: i++,
        stepName: detailsGroup.value['stepName'].toLowerCase().charAt(0).toUpperCase() + detailsGroup.value['stepName'].slice(1),
      });

      if(detailsGroup.value['stepName'] === '') {
        this.errorAddStep.set('Ce champ est requis pour créer une nouvelle étape');
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

  removeRow(event: Event, arrayList: FormArray, dataIndex: string) { // dataIndex = ingredientIndex (ingredient-index) || stepIndex (step-index)
    const element = event.target as HTMLElement;
    const indexElement = element.closest('tr')!.dataset[dataIndex];

    arrayList.removeAt(Number(indexElement));
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

  onSubmit() {
    Object.keys(this.recipeForm.formGroup.controls).forEach(ctrl => {
      const control = this.recipeForm.formGroup.get(ctrl) as FormControl;

      if(control && control?.invalid) {
        this.arrayInvalidControl.push(ctrl);
      }
    });

    this.recipeForm.formGroup.get('authorId')?.setValue(this.authorIdValue);
    this.recipeForm.formGroup.get('created')?.setValue(this.createdDate.datetime);

    this.recipesApiService.createRecipe(this.recipeForm.formGroup.value).subscribe({
      next: (result) => console.log('Recette créée', result),
      error: (err) => console.log('Err Front create recipe', err)
    });

  }
}
