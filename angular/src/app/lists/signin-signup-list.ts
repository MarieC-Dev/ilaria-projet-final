import { User } from "../models/user.model";

export const SIGNUP = [
    {
        id: 'signup-picture',
        icon: 'user-regular.svg',
        label: 'Ajouter une photo de profile',
        type: 'file',
        inputid: 'signup-signup-add-picture',
        name: 'signup-add-picture',
        required: false,
    }, {
        id: 'signup-firstname',
        type: 'text',
        label: 'Prénom',
        inputid: 'signup-signup-firstname',
        name: 'signup-firstname',
        required: true,
    }, {
        id: 'signup-lastname',
        type: 'text',
        label: 'Nom',
        inputid: 'signup-signup-lastname',
        name: 'signup-lastname',
        required: true,
    }, {
        id: 'signup-username',
        type: 'text',
        label: "Nom d'utilisateur",
        inputid: 'signup-signup-username',
        name: 'signup-username',
        required: true,
    }, {
        id: 'signup-email',
        type: 'email',
        label: "Email",
        inputid: 'signup-signup-email',
        name: 'signup-email',
        required: true,
    }, {
        id: 'signup-password',
        type: 'password',
        label: "Email",
        inputid: 'signup-signup-password',
        name: 'signup-password',
        required: true,
    },
];

export const SIGNIN = [
    {
        id: 'signin-email',
        type: 'email',
        label: "Email",
        inputid: 'signin-signup-email',
        name: 'signin-email',
        required: true,
    }, {
        id: 'signin-password',
        type: 'password',
        label: "Email",
        inputid: 'signin-signup-password',
        name: 'signin-password',
        required: true,
    },
];