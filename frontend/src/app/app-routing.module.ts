import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { LoginComponent } from './components/login/login.component';
import { SupervisorGuard } from './guards/supervisor.guard';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ReviewComponent } from './components/review/review.component';
import { AddReviewComponent } from './components/add-review/add-review.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'employees', component: EmployeesComponent, canActivate: [SupervisorGuard] },
  { path: 'addemployee', component: AddEmployeeComponent, canActivate: [SupervisorGuard] },
  { path: 'employees/:id', component: EmployeeComponent, canActivate: [SupervisorGuard] },
  { path: 'reviews/:id', component: ReviewComponent, canActivate: [SupervisorGuard] },
  // { path: 'addreview/:id', component: AddReviewComponent, canActivate: [SupervisorGuard] },
  { path: 'addreview/:id', component: AddReviewComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
