import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { response } from 'express';
import { CoursesService } from '../../services/courses/courses.service';
import { AuthService } from '../../services/auth/auth.service';
import { CourseDetailsComponent } from "../course-details/course-details.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseDetailsComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [];
  courseToShow: number = -1;
  constructor(private courseService: CoursesService, private authService: AuthService,) {
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

}
