import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RecipeDetailPageComponent } from './pages/recipe-detail-page/recipe-detail-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

export const routes: Routes = [
    /* { path: '/recipe/:id', component: RecipeDetailPageComponent }, */
    { path: 'home', component: HomePageComponent },
    { path: 'recipe', component: RecipeDetailPageComponent },
    { path: 'connection', component: SigninPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: NotFoundPageComponent },
];
