import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/Course';
import { LessonsService } from '../../services/lessons/lessons.service';
import { Lesson } from '../../models/Lesson';
import { Router } from '@angular/router';

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

  constructor(private courseService: CoursesService, private lessonsServise:LessonsService,private router: Router) {}
  
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

  deleteLesson(lessonId:number){
    this.lessonsServise.deleteLesson(lessonId,this.courseId).subscribe({
      next: (res) => {
        console.log(res.message);
        this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
      },
      error: (err) => console.error(err)
    });
  }
  updateLesson(lessonId:number){
    this.router.navigate([`/courses/${this.courseId}/lessons/${lessonId}/update`]);
  }
  addlesson(){
    this.router.navigate([`/courses/${this.courseId}/lessons/add`]);
  }
}
