import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogContent } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  standalone: true,
imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDialogContent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login({email: this.loginForm.get('email')?.value, password:this.loginForm.get('password')?.value}).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log(response);
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err)
      });
    }
  }

}
