import { COOKING_TYPE_LIST } from "./cooking-type-list";
import { CUISINE_TYPE } from "./cuisine-type-list";

let index: number = 0;

export const RECIPES_FILTER = [
    {
        id: index++,
        title: 'Type de cuisine',
        items: CUISINE_TYPE
    }, {
        id: index++,
        title: 'Difficultés',
        items: [
            {
                id: 1,
                title: 'Facile',
                value: 'easy',
            }, {
                id: 2,
                title: 'Moyen',
                value: 'medium',
            }, {
                id: 3,
                title: 'Difficile',
                value: 'difficult',
            },
        ]
    }, {
        id: index++,
        title: 'Type de cuisson',
        items: COOKING_TYPE_LIST
    }
]
