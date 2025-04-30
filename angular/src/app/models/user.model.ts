export interface User {
    id: number,
    picture: string,
    username: string,
    email?: string,
    password?: string,
    numberOfRecipes?: number,
    created?: string
}

export type UserList = User[];