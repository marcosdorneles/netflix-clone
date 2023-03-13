export interface IUser {
    id?: number;
    email:string;
    password:string
}

export class User implements IUser{
    id?: number;
    email!:string;
    password!:string
}
