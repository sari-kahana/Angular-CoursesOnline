import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,MatCardModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  addCourseForm: FormGroup;
  constructor(private fb: FormBuilder, private courseService: CoursesService, private authService: AuthService, private router: Router) {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addCourseForm.valid) {
      const teacherId = this.authService.getUserId();
      this.courseService.addCourse(this.addCourseForm.get('title')?.value, this.addCourseForm.get('description')?.value, teacherId).subscribe({
        next: (response) => {
          alert(response.message);
          this.router.navigate(['/courses']);
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
