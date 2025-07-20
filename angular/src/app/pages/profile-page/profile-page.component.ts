import { Component, inject, OnInit, signal } from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { ActivatedRoute } from '@angular/router';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';
import {UsersApiService} from '../../services/users-api.service';
import { UserFormFactory } from '../../factories/user-form.factory';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

interface User {
  id: number,
  imageName: string,
  username: string,
  email: string,
  password: string
}

@Component({
  selector: 'app-profile-page',
  imports: [
    HeaderProfileComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  userForm!: UserFormFactory;
  recipesList = signal(RECIPE_LIST);
  userId!: number;
  userData!: User;
  userImage: File | null = null;

  constructor(private userApi: UsersApiService, private route: ActivatedRoute) {
    this.userForm = new UserFormFactory();
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userApi.getOneUser(this.userId).subscribe({
      next: (result) => {
        const data = result.profile[0];
        this.userData = {
          id: data.id,
          imageName: data.imageName,
          username: data.username,
          email: data.email,
          password: data.password
        }
        console.log(this.userData)
      },
      error: (error) => console.log('Erreur get user data', error)
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const formData = new FormData();
      this.userImage = input.files[0];

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
    console.log('update')
    //const userId: number = Number(this.route.snapshot.paramMap.get('id'));
  }
}
