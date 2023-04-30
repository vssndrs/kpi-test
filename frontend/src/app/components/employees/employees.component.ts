import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees$: Observable<Employee[]> = this.employeeService.getEmployees();

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }



}
