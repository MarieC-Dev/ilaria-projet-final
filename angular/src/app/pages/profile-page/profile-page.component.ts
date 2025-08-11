import { Component, inject, OnInit, signal } from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { ActivatedRoute } from '@angular/router';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';
import {UsersApiService} from '../../services/users-api.service';
import { UserFormFactory } from '../../factories/user-form.factory';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [
    HeaderProfileComponent,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  userForm!: UserFormFactory;
  recipesList = signal(RECIPE_LIST);
  userId!: number;
  userImage: File | null = null;
  isUpdated = signal(false);

  constructor(private userApi: UsersApiService, private route: ActivatedRoute) {
    this.userForm = new UserFormFactory();
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userApi.getOneUser(this.userId).subscribe((res) => {
      const data = res.profile[0];
      this.userForm.formGroupCreate.patchValue({
        imageName: data.imageName,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.roleId,
      });

      console.log(this.userForm.formGroupCreate.value);
    });

    /*this.userApi.getOneUser(this.userId).subscribe({
      next: (result) => {
        const data = result.profile[0];
        this.userData = {
          id: data.id,
          imageName: data.imageName,
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role
        }
        console.log(this.userData);
      },
      error: (error) => console.log('Erreur get user data', error)
    });*/
  }

  get username(): string {
    return this.userForm.formGroupCreate.get('username')?.value;
  }

  get profileImage(): string {
    return this.userForm.formGroupCreate.get('imageName')?.value;
  }

  removeProfileImage() {
    this.userForm.formGroupCreate.get('imageName')?.setValue('');
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

    console.log({img: file});
    return formData;
  }

  onSubmit() {
    const formData = this.buildFormDataFormGroup(this.userForm.formGroupCreate, this.userImage);

    this.userApi.updateUser(this.userId, formData).subscribe({
      next: (result) => this.isUpdated.set(true),
      error: (err) => console.log('Err Front update profile', err)
    });
  }
}
