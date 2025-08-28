export interface CookingType {
    id: number,
    inputId: string,
    image: string,
    altImage: string,
    title: string,
    checked: boolean,
    value: string,
    required: boolean,
}

export type CookingTypeList = CookingType[];
