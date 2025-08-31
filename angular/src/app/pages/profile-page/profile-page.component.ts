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
  editPassword = signal<boolean>(false);

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
      });
    });
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

  editPasswordBoolFn() {
    return this.editPassword.update((bool) => bool = !bool);
  }

  buildFormDataFormGroup(formGroup: FormGroup, file: File| any): FormData {
    const formData = new FormData();

    formData.append('imageName', formGroup.get('imageName')?.value);
    formData.append('username', formGroup.get('username')?.value);
    formData.append('email', formGroup.get('email')?.value);

    if(this.editPassword() && formGroup.get('password')?.value) {
      formData.append('password', formGroup.get('password')?.value);
    }

    if (file) {
      formData.append('user-image', file);
      formData.append('imageName', file.name);
    }

    return formData;
  }

  onSubmit() {
    const formData = this.buildFormDataFormGroup(this.userForm.formGroupCreate, this.userImage);

    this.userApi.updateUser(this.userId, formData).subscribe({
      next: (result) => window.location.reload(),
      error: (err) => console.log('Err Front update profile', err)
    });
  }
}
