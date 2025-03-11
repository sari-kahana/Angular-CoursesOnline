// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatDialogModule } from '@angular/material/dialog';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, MatSlideToggleModule, RouterLink, RouterLinkActive, MatDialogModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'CourseOnlineClient';
  
// }
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    CommonModule, 
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'OnlineCourseManagementProject';

}





