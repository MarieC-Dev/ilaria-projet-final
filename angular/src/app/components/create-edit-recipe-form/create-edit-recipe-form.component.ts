import {Component, inject, Input, OnInit, signal} from '@angular/core';
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
import {RecipeFormFactory} from '../../factories/recipe-form.factory';
import {CommonModule} from '@angular/common';
import {DatetimeService} from '../../services/datetime.service';
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {switchMap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ServingNumberApiService} from '../../services/serving-number-api.service';
import {RecipeTimeApiService} from '../../services/recipe-time-api.service';
import {IngredientsStepsApiService} from '../../services/ingredients-steps-api.service';
import {DeleteIconComponent} from '../icons/delete-icon/delete-icon.component';

@Component({
  selector: 'app-create-edit-recipe-form',
  imports: [
    CommonModule,
    MultipleInputsComponent,
    CookingTypeComponent,
    DifficultyComponent,
    FormsModule,
    ReactiveFormsModule,
    DeleteIconComponent,
  ],
  templateUrl: './create-edit-recipe-form.component.html',
  styleUrl: './create-edit-recipe-form.component.scss'
})
export class CreateEditRecipeFormComponent implements OnInit {
  @Input() updateRecipe: boolean = false;
  recipeForm!: RecipeFormFactory;
  recipeFormStatus = signal('');
  recipeData!: any;
  recipeDataId!: number;

  recipeIngredientsList!: any[];
  recipeStepsList!: any[];

  isCooking = false;
  isPause = false;

  cuisineTypeList = signal(CUISINE_TYPE);
  createdDate = inject(DatetimeService);

  arrayInvalidControl: string[] = [];
  authorIdValue: number = 0;
  selectedImage: File | null = null;

  errorAddIngredient = signal('');
  errorAddStep = signal('');

  constructor(
    private accountAccess: IsLoggedInService,
    private recipesApiService: RecipesApiService,
    private servingNumberApi: ServingNumberApiService,
    private recipeTimeApi: RecipeTimeApiService,
    private ingredientsStepsApi: IngredientsStepsApiService,
    private route: ActivatedRoute
  ) {
    this.accountAccess.isLoggedIn().subscribe({
      next: (result) => this.authorIdValue = result.user.id,
      error: (err) => console.log(err)
    });
  }

  ngOnInit(): void {
    const recipeId: number = Number(this.route.snapshot.paramMap.get('recipeId'));
    this.recipeDataId = recipeId;

    this.recipeForm = new RecipeFormFactory();

    this.recipeFormStatus.set(this.recipeForm.formGroup.status);

    this.recipeForm.formGroup.statusChanges.subscribe((status) =>
      this.recipeFormStatus.set(status)
    );

    if(this.updateRecipe) {
      this.recipesApiService.getOneRecipe(recipeId).pipe(
        switchMap((recipe: any[]) => {
          this.recipeData = recipe[0];

          this.recipeForm.formGroup.patchValue({
            name: recipe[0].name,
            description: recipe[0].description,
            imageName: recipe[0].imageName,
            cuisineType: recipe[0].cuisineType,
            cookingType: recipe[0].cookingType,
            difficulty: recipe[0].difficulty,
            authorId: recipe[0].authorId,
            created: recipe[0].created,
          });

          return this.servingNumberApi.getOneServingNumber(this.recipeData.servingNumberId);
        }),
        switchMap((serving: any) => {
          this.recipeForm.formGroup.get('servingNumber')?.patchValue({
            number: serving.result[0].number,
            type: serving.result[0].servingType
          })

          return this.recipeTimeApi.getOneRecipeTime(this.recipeData.recipeTimeId);
        }),
        switchMap((time) => {
          this.recipeForm.formGroup.get('recipeTime')?.patchValue({
            making: {
              hours: time.result[0].makingH,
              minutes: time.result[0].makingMin
            },
            pause: {
              hours: time.result[0].pauseH,
              minutes: time.result[0].pauseMin
            },
            cooking: {
              hours: time.result[0].cookingH,
              minutes: time.result[0].cookingMin
            },
          });

          return this.ingredientsStepsApi.getIngredientsList();
        }),
        switchMap((ingredientsList) => {
          const ingredientResult = ingredientsList.rows;

          const ingredientsListFilter = ingredientResult.filter((ingredient: any) => {
            return ingredient.recipeId === this.recipeData.id
          });
          this.recipeIngredientsList = ingredientsListFilter;

          return this.ingredientsStepsApi.getAllIngredients();
        }),
        switchMap((ingredient): any => {
          const ingredientsResult = ingredient.rows;

          const list = this.recipeIngredientsList.map((elmList) => {
            return ingredientsResult.filter((elm: any) => elm.id === elmList.ingredientId);
          });

          list.map((item: any) => {
            this.ingredientsList.push(
              new FormGroup({
                id: new FormControl<string>(item[0].id),
                quantity: new FormControl<string>(item[0].quantity),
                unit: new FormControl<string>(item[0].unit),
                name: new FormControl<string>(item[0].name),
              })
            )
          });

          return this.ingredientsStepsApi.getStepsList();
        }),
        switchMap((stepsList: any) => {
          const stepResult = stepsList.rows;

          const stepsListFilter = stepResult.filter((step: any) => {
            return step.recipeId === this.recipeData.id
          });
          this.recipeStepsList = stepsListFilter;

          return this.ingredientsStepsApi.getAllSteps();
        }),
        switchMap((step) => {
          const stepsResult = step.rows;

          const list = this.recipeStepsList.map((elmList) => {
            return stepsResult.filter((elm: any) => elm.id === elmList.stepId);
          });

          list.map((item: any, index: number) => {
            this.stepsList.push(
              new FormGroup({
                id: new FormControl<string>(item[0].id),
                number: new FormControl<string>(String(index + 1)),
                stepName: new FormControl<string>(item[0].stepName),
              })
            )
          });

          return this.ingredientsStepsApi.getStepsList();
        }),
      ).subscribe(() => {
        console.log('subscribe')
        console.log(this.recipeFormStatus())
      })
    }
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

  removeRow(arrayList: FormArray, id: number) {
    arrayList.removeAt(id);
  }

  /* INGREDIENTS */
  get ingredientsList(): FormArray {
    return this.recipeForm.formGroup.get('ingredientsList') as FormArray;
  }

  get ingredientsListGroups() {
    return this.ingredientsList.controls as FormGroup[];
  }
  /* ===== */

  /* STEPS */
  get stepsList() {
    return this.recipeForm.formGroup.get('stepsList') as FormArray;
  }

  get stepsListGroups() {
    return this.stepsList.controls as FormGroup[];
  }
  /* ===== */

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const formData = new FormData();
      this.selectedImage = input.files[0];

      this.recipeForm.formGroup.get('imageName')?.setValue(this.selectedImage.name);

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

    if(this.updateRecipe) {
      this.recipesApiService.updateRecipe(this.recipeDataId, formData).subscribe({
        next: () => window.location.reload(),
        error: (err) => console.log('Err Front update recipe', err)
      });
    } else {
      this.recipesApiService.createRecipe(formData).subscribe({
        next: () => window.location.reload(),
        error: (err) => console.log('Err Front create recipe', err)
      });
    }
  }
}
