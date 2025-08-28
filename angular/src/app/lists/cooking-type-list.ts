import { CookingTypeList } from "../models/cooking-type.model";

let index: number = 0;

export const COOKING_TYPE_LIST = [
    {
        id: index++,
        inputId: 'hot-plate',
        image: 'hot-plate.svg',
        altImage: 'hot plate',
        title: 'Plaque chauffante',
        checked: false,
        value: 'hot-plate',
        required: false,
    }, {
        id: index++,
        inputId: 'stove',
        image: 'stove.svg',
        altImage: 'stove',
        title: 'Four',
        checked: false,
        value: 'stove',
        required: false,
    }, {
        id: index++,
        inputId: 'air-fryer',
        image: 'air-fryer.svg',
        altImage: 'air fryer',
        title: 'Air fryer',
        checked: false,
        value: 'air-fryer',
        required: false,
    }, {
        id: index++,
        inputId: 'barbecue',
        image: 'bbq.svg',
        altImage: 'barbecue',
        title: 'Barbecue',
        checked: false,
        value: 'barbecue',
        required: false,
    }, {
        id: index++,
        inputId: 'no-cooking',
        image: 'not-solid.svg',
        altImage: 'no cooking',
        title: 'Sans cuisson',
        checked: false,
        value: 'no-cooking',
        required: false,
    }
];
