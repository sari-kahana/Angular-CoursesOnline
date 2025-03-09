import { Routes } from '@angular/router';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';
import { CoursesComponent } from '../../components/courses/courses.component';

export const routes: Routes = [
    {path: 'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path: 'courses', component:CoursesComponent}
];
