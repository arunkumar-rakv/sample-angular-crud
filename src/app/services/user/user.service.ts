import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://jsonplaceholder.typicode.com';
  users: User[] = [];

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    this.users = await this.getUserList().toPromise();
  }

  getUsers() {
    return this.users;
  }

  createUser(user: User): Observable<Object> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return this.http.post(`${this.baseUrl}/users`, JSON.stringify(user));
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    let updateItem = this.users.find(user => user.id == id);
    let index = this.users.indexOf(updateItem);
    this.users[index] = user;
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    this.users = this.users.filter(user => user.id !== id);

    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  searchUsers(name: string) {
    return this.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }

}