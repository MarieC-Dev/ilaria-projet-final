import {Component, OnInit, signal} from '@angular/core';
import { SIGNUP } from '../../lists/signin-signup-list';
import { FormInputComponent } from '../../components/form-components/form-input/form-input.component';
import {UsersApiService} from '../../services/users-api.service';
import {JsonPipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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
  response: any;

  data: any[] = [];

  constructor(
    private usersApiService: UsersApiService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    //this.usersApiService.getAllUsers().subscribe(res => this.data = res);
  }

  onSubmit() {
    console.log(this.newUser);

    this.usersApiService.createUser(this.newUser).subscribe({
      next: (response) => console.log('Utilisateur créé :', response),
      error: (err) => console.error('Erreur FRONT :', err)
    });
  }
}
