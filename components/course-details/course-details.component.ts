import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/Course';
import { LessonsService } from '../../services/lessons/lessons.service';
import { Lesson } from '../../models/Lesson';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})

export class CourseDetailsComponent implements OnInit {
 
  @Input() courseId: number = 0;
  course!: Course;
  lessons!:Lesson[]

  constructor(private courseService: CoursesService, private lessonsServise:LessonsService) {}
  
  ngOnInit(): void {
    this.courseService.getCourseByID(this.courseId).subscribe({
      next: (course: Course) => {
        console.log(course);
        
        this.course = course;
      },
      error: (err) => console.error(err)
    });
    this.lessonsServise.getAllLessons(this.courseId).subscribe({
      next: (lessons: Lesson[]) => {
        console.log(lessons);
        
        this.lessons = lessons;
      },
      error: (err) => console.error(err)
    });
  }

}
