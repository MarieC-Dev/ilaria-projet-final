import { User } from "./user.model";

export interface Ingredient {
    id: number,
    quantity?: number,
    unit?: string,
    name: string
}

export interface RecipeStep {
    id: number,
    description: string
}

export interface RecipeTag {
    id: number,
    name: string
}

export interface RecipeCommentResponse {
    id: number,
    author: User,
    text: string,
    created: Date,
}

export interface RecipeComment {
    id: number,
    author: User,
    starScore: number, // 1 - 5 stars
    text: string,
    answers: RecipeCommentResponse[],
    created: Date,
}

export interface Time {
    hours?: number,
    minutes?: number
}

export interface ServingNumber {
    number: number,
    unit: string
}

export interface Recipe {
    id: number,
    image: string,
    title: string,
    description: string,
    cookingType: string,

    makingTime: Time, // in minutes
    cookingTime?: Time,
    pauseTime?: Time,
    totalTime: Time,

    servingNumber: ServingNumber,

    average?: number,
    numberOfVotes?: number,
    author: User,

    ingredientsList: Ingredient[],
    steps: RecipeStep[],
    tags: RecipeTag[],
    opinions?: RecipeComment[],

    created: Date,
}

export type RecipeList = Recipe[];