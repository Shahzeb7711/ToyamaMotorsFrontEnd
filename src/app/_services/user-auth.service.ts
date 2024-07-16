import { Injectable } from '@angular/core';

@Injectable()
export class UserAuthService {
  constructor() {}

  public setRoles(roles: string[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }
  
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles().length && !!this.getToken();
  }

  public isAdmin(){
    const roles : any[] = this.getRoles();
    // console.log(roles);
    return roles[0] == "ROLE_ADMIN";
  }

  public isUser(){
    const roles : any[] = this.getRoles();
    // console.log(roles);
    return roles[0] == "ROLE_USER";
  }
}