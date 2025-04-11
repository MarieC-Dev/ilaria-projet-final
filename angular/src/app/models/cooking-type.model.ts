export interface CookingType {
    id: number,
    inputId: string,
    image: string,
    altImage: string,
    title: string,
    checked: boolean,
    required: boolean,
}

export type CookingTypeList = CookingType[];