// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CoursesService {

//   private apiUrl = 'http://localhost:3000/api/courses';

//   constructor(private http: HttpClient) { }

//   getCourses(): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.apiUrl}`, { headers });
//   }
//   getCourseByID(courseId:number): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.apiUrl}/${courseId}`, { headers });
//   }
//   enrollToCourse(courseId:number, userId:number):Observable<any>{
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post(`${this.apiUrl}/${courseId}/enroll`,{userId}, { headers });
//   }
//   unEnroll(courseId: number, userId: number): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {
//       headers,
//       body: { userId }
//     });
//   }
//   addCourse(title:string, description: string, teacherId: number): Observable<any>{
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post(`${this.apiUrl}`,{title, description, teacherId}, { headers });
//   }
//   updateCourse(id: number, title: string, description: string, teacherId: number): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.put(`${this.apiUrl}/${id}`, { title, description, teacherId }, { headers });
//   }

//   deleteCourse(courseId: number): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.delete(`${this.apiUrl}/${courseId}`, { headers });
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  getCourseByID(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}`, { headers: this.getHeaders() });
  }

  enrollToCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers: this.getHeaders() });
  }

  unEnroll(courseId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {
      headers: this.getHeaders(),
      body: { userId }
    });
  }

  addCourse(title: string, description: string, teacherId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { title, description, teacherId }, { headers: this.getHeaders() });
  }

  updateCourse(id: number, title: string, description: string, teacherId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { title, description, teacherId }, { headers: this.getHeaders() });
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`, { headers: this.getHeaders() });
  }
}

