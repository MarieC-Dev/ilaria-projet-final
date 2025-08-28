import { CookingTypeList } from "./cooking-type.model";
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
  created: string,
}

export interface RecipeComment {
    id: number,
    author: User,
    starScore: number, // 1 - 5 stars
    text: string,
    answers: RecipeCommentResponse[],
    created: string,
}

export interface Recipe {
    id: number,
    name: string,
    description: string,
    imageName: string,
    cuisineType: string,
    cookingType: string,
    servingNumberId: number,
    difficulty: string,
    authorId: number,
    created: string,
}

export type RecipeList = Recipe[];
