import { RecipeList } from "../models/recipe.model";
import { COOKING_TYPE_LIST } from "./cooking-type-list";

function getNewDate() {
    const newDate = new Date();
    let optionsDate: any = { day: '2-digit', month: '2-digit', year: 'numeric' };
    let options: any = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    /* const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month < 10 ? '0' + month : month}/${year}`; */
    const formattedDate = formatter.format(newDate);
    return formattedDate.toString();
}

let index = 0;
const ingredientsList = [
    {
        id: 0,
        quantity: 2,
        unit: 'cuillère à soupe',
        name: 'Salade'
    }, {
        id: 1,
        quantity: 2,
        unit: 'coeurs',
        name: 'Huile'
    }, {
        id: 2,
        quantity: 25,
        unit: 'g',
        name: 'Parmesan'
    }, {
        id: 3,
        quantity: 4,
        unit: 'tranches',
        name: 'Pains écroutées'
    }, {
        id: 4,
        quantity: 0.5,
        unit: 'cuillère à café',
        name: 'moutarde'
    }, {
        id: 5,
        quantity: 0,
        unit: '',
        name: 'poivre'
    }, {
        id: 6,
        quantity: 0,
        unit: '',
        name: 'sel'
    }, {
        id: 7,
        quantity: 1,
        unit: '',
        name: 'Citron'
    }, {
        id: 8,
        quantity: 1,
        unit: 'gousse',
        name: 'ail pelée'
    },
];
const steps = [
    {
        id: 0,
        description: "Faites dorer le pain, coupé en cubes, 3 min dans un peu d'huile."
    }, {
        id: 1,
        description: "Déchirez les feuilles de romaine dans un saladier, et ajoutez les croûtons préalablement épongés dans du papier absorbant."
    }, {
        id: 2,
        description: "Préparez la sauce : Faites cuire l'oeuf 1 min 30 dans l'eau bouillante, et rafraîchissez-le."
    }, {
        id: 3,
        description: "Cassez-le dans le bol d'un mixeur et mixez, avec tous les autres ingrédients; rectifiez l'assaissonnement et incorporez à la salade."
    }, {
        id: 4,
        description: "Décorez de copeaux de parmesan, et servez."
    },
];
const tags = [
    {
        id: 0,
        name: 'Salade'
    }, {
        id: 1,
        name: 'Healthy'
    },
];
const opinions = [
    {
        id: 0,
        author: {
            id: 33,
            username: 'soring',
            picture: 'profil.jpg'
        },
        starScore: 4,
        text: "Pas besoin d'ajouter du sel. Celui contenu dans la moutarde et les capres est suffisant. Sinon très bon.",
        answers: [
            {
                id: 0,
                author: {
                    id: 1,
                    username: 'Toto le cuisto',
                    picture: 'profil-3.jpg'
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                created: getNewDate()
            }, {
                id: 1,
                author: {
                    id: 34,
                    username: 'anonyme',
                    picture: 'profil-2.jpg'
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                created: getNewDate()
            }, {
                id: 2,
                author: {
                    id: 1,
                    username: 'Toto le cuisto',
                    picture: 'profil-3.jpg'
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                created: getNewDate()
            }, {
                id: 3,
                author: {
                    id: 33,
                    username: 'soring',
                    picture: 'profil.jpg'
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                created: getNewDate()
            }, {
                id: 4,
                author: {
                    id: 34,
                    username: 'anonyme',
                    picture: 'profil-2.jpg'
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                created: getNewDate()
            },
        ],
        created: getNewDate(),
    }, {
        id: 1,
        author: {
            id: 34,
            username: 'anonyme',
            picture: 'profil-2.jpg'
        },
        starScore: 5,
        text: "Accompagnée d'une quiche, c'était très bon. Merci!",
        answers: [
            {
                id: 0,
                author: {
                    id: 34,
                    username: 'anonyme',
                    picture: 'profil-2.jpg'
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                created: getNewDate()
            }, {
                id: 1,
                author: {
                    id: 33,
                    username: 'soring',
                    picture: 'profil.jpg'
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                created: getNewDate()
            },
        ],
        created: getNewDate(),
    }, {
        id: 2,
        author: {
            id: 35,
            username: 'Steve',
            picture: 'profil-3.jpg'
        },
        starScore: 4,
        text: "Accompagnée d'une quiche, c'était très bon. Merci!",
        answers: [],
        created: getNewDate(),
    }, {
        id: 3,
        author: {
            id: 36,
            username: 'boulette',
            picture: 'profil-2.jpg'
        },
        starScore: 3,
        text: "Moyen",
        answers: [],
        created: getNewDate(),
    },  {
        id: 4,
        author: {
            id: 41,
            username: 'truffe',
            picture: 'profil-2.jpg'
        },
        starScore: 3,
        text: "Peu mieux faire",
        answers: [],
        created: getNewDate(),
    },
];

export const RECIPE_LIST: any = [
    {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    }, {
        id: index++,
        imageName: 'salade.jpg',
        name: 'Salade César',
        description: "La salade César est composée de la cuisine américaine à base de laitue romaine, œuf dur, croûtons, parmesan et de sauce César à base de parmesan râpé, huile d'olive, pâte d'anchois, ail, vinaigre de vin, moutarde, jaune d'œuf et sauce Worcestershire",
        cookingType: COOKING_TYPE_LIST,
        cuisineType: 'française',

        makingTime: {
            hours: 2,
            minutes: 30,
        },
        cookingTime: {
            hours: 1,
            minutes: 45,
        },
        pauseTime: {
            hours: 0,
            minutes: 15,
        },
        totalTime: {
            hours: 0,
            minutes: 20,
        },
        servingNumber: {
            number: 4,
            unit: 'personnes'
        },

        average: opinions.map((op) => op.starScore),
        numberOfVotes: opinions.length,
        author: {
            id: 1,
            username: 'Toto le cuisto',
            picture: '',
            numberOfRecipes: 21,
            created: getNewDate()
        },

        ingredientsList: ingredientsList,
        steps: steps,
        tags: tags,
        opinions: opinions,
        created: getNewDate(),
    },
];
