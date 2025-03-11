import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:3000/api/auth";
  constructor(private http: HttpClient) { }
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  getUserId():number{
    let userId!: string|null;
    if (typeof window !== 'undefined') {
      userId = localStorage.getItem('userId');
    }
    return userId?+userId:0;
  }
}
