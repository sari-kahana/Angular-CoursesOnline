import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { response } from 'express';
import { CoursesService } from '../../services/courses/courses.service';
import { AuthService } from '../../services/auth/auth.service';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseDetailsComponent, MatListModule, MatCardModule, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [];
  courseToShow: number = -1;
  constructor(private courseService: CoursesService, private authService: AuthService, private router: Router) {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => console.error(err)
    });
  }
  enrollToCourse(courseId: number) {
    const userId = this.authService.getUserId();
    this.courseService.enrollToCourse(courseId, userId).subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (err) => console.error(err)
    });
  }
  leaveCourse(courseId: number) {
    const userId = this.authService.getUserId();
    this.courseService.unEnroll(courseId, userId).subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (err) => console.error(err)
    });
  }
  showCourseDetails(courseId: number){
    this.courseToShow = courseId;
  }
  openForm() {
    this.router.navigate(['/courses/add-course']);
  }
  openUpdateForm(courseId: number){
    this.router.navigate([`/courses/${courseId}/update`]);
  }
  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (response) => {
        console.log(response.message);
        this.courses = this.courses.filter(course => course.id !== courseId);
      },
      error: (err) => console.error(err)
    });
  }

}
