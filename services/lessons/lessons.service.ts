// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LessonsService {

//   private apiUrl = 'http://localhost:3000/api/courses';
//   constructor(private http: HttpClient) { }
//   getAllLessons(courseId:number):Observable<any>{
//      const token = localStorage.getItem('token');
//      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//      return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers });
//   }
//   getLessonById(courseId:number, lessonId:number):Observable<any>{
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
//   }
//   addLesson(title:string, content:string, courseId:number):Observable<any>{
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post(`${this.apiUrl}/${courseId}/lessons`, {title, content}, { headers });
//   }
//   deleteLesson(lessonId:number,courseId:number):Observable<any>{
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
//   }
//   updateLesson(lessonId:number,courseId:number, title:string, content:string):Observable<any>{
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, {title, content}, { headers });
//   }

// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getAllLessons(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers: this.getHeaders() });
  }

  getLessonById(courseId: number, lessonId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }

  addLesson(title: string, content: string, courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, { title, content }, { headers: this.getHeaders() });
  }

  deleteLesson(lessonId: number, courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }

  updateLesson(lessonId: number, courseId: number, title: string, content: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { title, content }, { headers: this.getHeaders() });
  }
}
