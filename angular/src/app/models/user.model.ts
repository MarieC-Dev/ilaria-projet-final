export interface User {
    id: number,
    picture: string,
    username: string,
    email?: string,
    password?: string,
    numberOfRecipes?: number,
    created?: Date
}

export type UserList = User[];