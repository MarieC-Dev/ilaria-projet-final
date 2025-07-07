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
import {IsLoggedInService} from '../../services/isLoggedIn.service';
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
  selectedImage: File | null = null;

  constructor(private accountAccess: IsLoggedInService, private recipesApiService: RecipesApiService) {
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const formData = new FormData();
      this.selectedImage = input.files[0];
      //console.log('Image sélectionnée :', this.selectedImage);

      this.recipeForm.formGroup.get('imageName')?.setValue(this.selectedImage.name);
      this.recipeForm.formGroup.get('imageData')?.setValue([this.selectedImage]);

      formData.append('recipe-image', this.selectedImage);
    }
  }

  buildFormDataFormGroup(formGroup: FormGroup, file: File| any): FormData {
    const formData = new FormData();

    formData.append('name', formGroup.get('name')?.value);
    formData.append('description', formGroup.get('description')?.value);
    formData.append('cuisineType', formGroup.get('cuisineType')?.value);
    formData.append('cookingType', formGroup.get('cookingType')?.value);
    formData.append('difficulty', formGroup.get('difficulty')?.value);
    formData.append('authorId', formGroup.get('authorId')?.value);
    formData.append('created', formGroup.get('created')?.value);

    // Image
    if (file) {
      formData.append('recipe-image', file); // ce nom doit correspondre à multer.single('recipe-image')
      formData.append('imageName', file.name);
    }

    console.log(file)

    // servingNumber
    const servingNumber = formGroup.get('servingNumber') as FormGroup;
    formData.append('servingNumber.number', servingNumber.get('number')?.value);
    formData.append('servingNumber.type', servingNumber.get('type')?.value);

    // recipeTime
    const recipeTime = formGroup.get('recipeTime') as FormGroup;
    ['making', 'cooking', 'pause'].forEach(section => {
      const timeGroup = recipeTime.get(section) as FormGroup;
      formData.append(`recipeTime.${section}.type`, timeGroup.get('type')?.value);
      formData.append(`recipeTime.${section}.hours`, timeGroup.get('hours')?.value || '0');
      formData.append(`recipeTime.${section}.minutes`, timeGroup.get('minutes')?.value || '0');
    });

    // ingredientsList
    const ingredientsList = formGroup.get('ingredientsList') as FormArray;
    ingredientsList.controls.forEach((group: any, i) => {
      formData.append(`ingredientsList[${i}][quantity]`, group.get('quantity')?.value);
      formData.append(`ingredientsList[${i}][unit]`, group.get('unit')?.value);
      formData.append(`ingredientsList[${i}][name]`, group.get('name')?.value);
    });

    // stepsList
    const stepsList = formGroup.get('stepsList') as FormArray;
    stepsList.controls.forEach((group: any, i) => {
      formData.append(`stepsList[${i}][stepName]`, group.get('stepName')?.value);
    });

    return formData;
  }

  onSubmit() {
    this.recipeForm.formGroup.get('authorId')?.setValue(this.authorIdValue);
    this.recipeForm.formGroup.get('created')?.setValue(this.createdDate.datetime);

    Object.keys(this.recipeForm.formGroup.controls).forEach(ctrl => {
      const control = this.recipeForm.formGroup.get(ctrl) as FormControl;

      if(control && control?.invalid) {
        this.arrayInvalidControl.push(ctrl);
      }
    });

    const formData = this.buildFormDataFormGroup(this.recipeForm.formGroup, this.selectedImage);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    this.recipesApiService.createRecipe(formData).subscribe({
      next: (result) => window.location.reload(),
      error: (err) => console.log('Err Front create recipe', err)
    });

  }
}
