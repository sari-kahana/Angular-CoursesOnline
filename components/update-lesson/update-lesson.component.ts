import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonsService } from '../../services/lessons/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update-lesson',
  standalone: true,
  imports: [ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.css'
})
export class UpdateLessonComponent {
    updateLessonForm: FormGroup;
    courseId!: number;
    lessonId!: number;
    constructor(private fb: FormBuilder,private lessonsService: LessonsService,private activatedRoute: ActivatedRoute, private router: Router) {
        this.updateLessonForm = this.fb.group({
          title: ['', [Validators.required]],
          content: ['', [Validators.required]],
        });
        this.activatedRoute.params.subscribe(params => {
          this.courseId = +params['id'];
          this.lessonId = +params['lessonId'];
        })
      }
      onSubmit() {
        if (this.updateLessonForm.valid) {
          this.lessonsService.updateLesson(this.lessonId,this.courseId,this.updateLessonForm.get('title')?.value, this.updateLessonForm.get('content')?.value).subscribe({
            next: (response) => {
              console.log(response.message);
              this.router.navigate([`/courses`]);
            },
            error: (err) => console.error(err)
          });
        }
      }

  

}
