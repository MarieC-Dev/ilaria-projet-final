import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RecipeDetailsPage } from './pages/recipe-details-page/recipe-details-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { CreateRecipesComponent } from './pages/create-recipes/create-recipes.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
    /* { path: '/recipe/:id', component: RecipeDetailsPage }, */
    { path: 'profil/creer-une-recette', component: CreateRecipesComponent },
    { path: 'profil', component: ProfilePageComponent },
    { path: 'accueil', component: HomePageComponent },
    { path: 'recettes', component: RecipeDetailsPage },
    { path: 'connexion', component: SigninPageComponent },
    { path: 'inscription', component: SignupPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: '**', component: NotFoundPageComponent },
];
