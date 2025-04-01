export interface User {
    id: number,
    picture?: string,
    firstname?: string,
    lastname?: string,
    username: string,
    numberOfRecipes?: number,
    password?: string,
    created?: Date
}

export type UserList = User[];