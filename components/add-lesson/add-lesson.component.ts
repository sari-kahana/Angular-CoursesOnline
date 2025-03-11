import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonsService } from '../../services/lessons/lessons.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [ReactiveFormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,MatCardModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
    addLessonForm: FormGroup;
    courseId!: number;
    constructor(private fb: FormBuilder, private lessonService: LessonsService, private authService: AuthService, private router: Router,private activatedRoute: ActivatedRoute
    ) {
      this.addLessonForm = this.fb.group({
        title: ['', [Validators.required]],
        content: ['', [Validators.required]],
      });
      this.activatedRoute.params.subscribe(params => {
        this.courseId = +params['id'];
      })
    }
    onSubmit() {
      if (this.addLessonForm.valid) {
        this.lessonService.addLesson(this.addLessonForm.get('title')?.value, this.addLessonForm.get('content')?.value, this.courseId).subscribe({
          next: (response) => {
           alert(response.message);
            this.router.navigate([`/courses`]);
          },
          error: (err) =>{
            console.error(err);
            if (err.status === 403) {
              alert("You do not have permission to perform this action");
            }
          }
        });
      }
    }
  
}
