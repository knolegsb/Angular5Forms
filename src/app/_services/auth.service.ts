import { Injectable } from '@angular/core';
import { IUser } from '../_interfaces/IUser';

@Injectable()
export class AuthService {
    currentUser: IUser | null;
    redirectUrl: string;

    constructor() { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        this.currentUser = {
            id: 2,
            userName: userName,
            isAdmin: false
        };
    }

    logout(): void {
        this.currentUser = null;
    }
}