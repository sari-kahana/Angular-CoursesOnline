import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses/courses.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [ReactiveFormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule, MatCardModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent {
  courseId!: number;
  updateForm: FormGroup;
  constructor(private fb: FormBuilder,
    private courseService: CoursesService,
    private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.updateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.activatedRoute.params.subscribe(params => {
      this.courseId = +params['id'];
    })
  }
  onSubmit() {
    if (this.updateForm.valid) {
      const teacherId = this.authService.getUserId();
      this.courseService.updateCourse(this.courseId,this.updateForm.get('title')?.value, this.updateForm.get('description')?.value, teacherId).subscribe({
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
