import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  supervisorId!: string;

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.supervisorId = this.authService.getSupervisorId();
    this.employeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      registrationNumber: new FormControl(null , Validators.required),
      jobTitle: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (confirm('Biztosan hozzáadja a munkavállalót?')){
      let newEmployee = {...this.employeeForm.value, supervisor: this.supervisorId};
      this.employeeService.addEmployee(newEmployee).subscribe();
      this.employeeForm.reset();
    }
  }

}
