export const SIGNUP = [
    {
        id: 'signup-picture',
        label: 'Choisissez une photo de profil',
        type: 'file',
        inputId: 'signup-signup-add-picture',
        required: false,
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