import {Component, OnInit, signal} from '@angular/core';
import { SIGNUP } from '../../lists/signin-signup-list';
import {UsersApiService} from '../../services/users-api.service';
import {JsonPipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnInit {
  formInputConnection = signal(SIGNUP);
  newUser = {
    imageName: '',
    imageData: '',
    username: '',
    email: '',
    password: '',
    role: 3,
    created: Date.now(),
  }

  selectedImageFile: File | null = null;

  data: any[] = [];

  constructor(private usersApiService: UsersApiService) { }

  ngOnInit() {
    //this.usersApiService.getAllUsers().subscribe(res => this.data = res);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if(input.files && input.files.length > 0) {
      const reader = new FileReader();

      this.selectedImageFile = input.files[0];
      this.newUser.imageName = this.selectedImageFile.name;

      reader.onload = () => {
        this.newUser.imageData = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  onSubmit() {
    console.log(this.newUser);

    this.usersApiService.createUser(this.newUser).subscribe({
      next: (response) => console.log('Utilisateur créé :', response),
      error: (err) => console.error('Erreur FRONT :', err)
    });
  }
}
