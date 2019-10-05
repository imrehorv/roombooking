import { User } from './iuser';

export interface UserExt extends User {
    password: string;
}