import { User } from "../models/user.model";

export const SIGNUP = [
    {
        id: 'signup-picture',
        icon: 'user-regular.svg',
        label: 'Ajouter une photo de profile',
        type: 'file',
        inputId: 'signup-signup-add-picture',
        required: false,
    }, {
        id: 'signup-firstname',
        type: 'text',
        label: 'Prénom',
        inputId: 'signup-signup-firstname',
        required: true,
    }, {
        id: 'signup-lastname',
        type: 'text',
        label: 'Nom',
        inputId: 'signup-signup-lastname',
        required: true,
    }, {
        id: 'signup-username',
        type: 'text',
        label: "Nom d'utilisateur",
        inputId: 'signup-signup-username',
        required: true,
    }, {
        id: 'signup-email',
        type: 'email',
        label: "Email",
        inputId: 'signup-signup-email',
        required: true,
    }, {
        id: 'signup-password',
        type: 'password',
        label: "Mot de passe",
        inputId: 'signup-signup-password',
        required: true,
    },
];

export const SIGNIN = [
    {
        id: 'signin-email',
        type: 'email',
        label: "Email",
        inputId: 'signin-signup-email',
        required: true,
    }, {
        id: 'signin-password',
        type: 'password',
        label: "Mot de passe",
        inputId: 'signin-signup-password',
        required: true,
    },
];