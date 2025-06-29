import {Component, inject, OnInit, signal} from '@angular/core';
import { FormInputComponent } from "../../components/form-components/form-input/form-input.component";
import { RecipeItemComponent } from "../../components/recipe-item/recipe-item.component";
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeAverageService } from '../../services/recipe-average.service';
import {RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute} from '@angular/router';
import { ProfileIconComponent } from '../../components/icons/profile-icon/profile-icon.component';
import { HeartIconComponent } from '../../components/icons/heart-icon/heart-icon.component';
import { RecipeIconComponent } from '../../components/icons/recipe-icon/recipe-icon.component';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';
import {UsersApiService} from '../../services/users-api.service';
import {JsonPipe, NgIf} from '@angular/common';
import {UserFormFactory} from '../../factories/user-form.factory';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  imports: [
    JsonPipe,
    HeaderProfileComponent,
    FormInputComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  userForm!: UserFormFactory;
  recipesList = signal(RECIPE_LIST);
  userData: any[] = []
  lastRecipe = this.recipesList().slice(-1)[0];
  recipeAverage = inject(RecipeAverageService);
  userImage: File | null = null;

  constructor(private userApi: UsersApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const userId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userApi.getOneUser(userId).subscribe({
      next: (result) => this.userData = result,
      error: (error) => console.log('Erreur get user data', error)
    });

    if(this.userData.length > 0) {
      this.userData.forEach((user) => {
        this.userForm.formGroupCreate.patchValue({
          imageName: user.imageName,
          username: user.username,
          email: user.email,
          password: user.password,
        })
      })
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const formData = new FormData();
      this.userImage = input.files[0];
      //console.log('Image sélectionnée :', this.userImage);

      this.userForm.formGroupCreate.get('imageName')?.setValue(this.userImage.name);

      formData.append('recipe-image', this.userImage);
    }
  }

  buildFormDataFormGroup(formGroup: FormGroup, file: File| any): FormData {
    const formData = new FormData();

    formData.append('imageName', formGroup.get('imageName')?.value);
    formData.append('username', formGroup.get('username')?.value);
    formData.append('email', formGroup.get('email')?.value);
    formData.append('password', formGroup.get('password')?.value);

    if (file) {
      formData.append('user-image', file);
      formData.append('imageName', file.name);
    }

    console.log(file);

    return formData;
  }

  onSubmit() {

  }
}
