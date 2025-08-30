import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { UserAdminComponent } from './pages/user-admin/user-admin.component';
import { EadLayoutComponent } from './pages/ead/ead-layout/ead-layout.component';
import { EadDashboardComponent } from './pages/ead/dashboard/ead-dashboard.component';
import { EadCatalogComponent } from './pages/ead/catalog/ead-catalog.component';
import { EadMyCoursesComponent } from './pages/ead/my-courses/ead-my-courses.component';
import { EadCourseComponent } from './pages/ead/course/ead-course.component';
import { EadLessonComponent } from './pages/ead/lesson/ead-lesson.component';

export const routes: Routes = [
  { path: '', redirectTo: 'ead', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'ead',
    component: EadLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EadDashboardComponent },
      { path: 'cursos', component: EadCatalogComponent },
      { path: 'meus', component: EadMyCoursesComponent },
      { path: 'curso/:id', component: EadCourseComponent },
      { path: 'curso/:id/aula/:aulaId', component: EadLessonComponent },
    ]
  },
  { path: 'admin/usuario', component: UserAdminComponent, canActivate: [AuthGuard] },
];
