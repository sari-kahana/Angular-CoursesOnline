import { Routes } from '@angular/router';
import { CoursesComponent } from '../../components/courses/courses.component';
import { AddCourseComponent } from '../../components/add-course/add-course.component';
import { UpdateCourseComponent } from '../../components/update-course/update-course.component';
import { AddLessonComponent } from '../../components/add-lesson/add-lesson.component';
import { UpdateLessonComponent } from '../../components/update-lesson/update-lesson.component';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

export const routes: Routes = [
    {path: 'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path: 'courses', component:CoursesComponent},
    {path: 'courses/add-course', component: AddCourseComponent},
    {path: 'courses/:id/update', component: UpdateCourseComponent},
    {path: 'courses/:id/lessons/add', component: AddLessonComponent},
    {path: 'courses/:id/lessons/:id/update', component: UpdateLessonComponent},

];
