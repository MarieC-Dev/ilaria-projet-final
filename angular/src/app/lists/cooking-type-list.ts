import { CookingTypeList } from "../models/cooking-type.model";

let index: number = 0;

export const COOKING_TYPE_LIST: CookingTypeList = [
    {
      id: index++,
      inputId: 'hotPlate',
      image: 'hot-plate.svg',
      altImage: 'hot plate',
      title: 'Plaque chauffante',
      checked: false,
      required: false,
    }, {
        id: index++,
        inputId: 'stove',
        image: 'stove.svg',
        altImage: 'stove',
        title: 'Four',
        checked: false,
        required: false,
    }, {
        id: index++,
        inputId: 'airFryer',
        image: 'air-fryer.svg',
        altImage: 'air fryer',
        title: 'Air fryer',
        checked: false,
        required: false,
    }, {
        id: index++,
        inputId: 'barbecue',
        image: 'bbq.svg',
        altImage: 'barbecue',
        title: 'Barbecue',
        checked: false,
        required: false,
    }, {
        id: index++,
        inputId: 'no-cooking',
        image: 'not-solid.svg',
        altImage: 'no cooking',
        title: 'Sans cuisson',
        checked: false,
        required: false,
    }
];