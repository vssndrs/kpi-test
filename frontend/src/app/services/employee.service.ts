import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Supervisor } from '../models/supervisor';
import { Observable, map } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  BASE_URL = environment.apiUrl;
  supervisor: Supervisor | null = this.auth.supervisorObject.value;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getEmployees(): Observable<Employee[]> {
    const url = `${this.BASE_URL}employee`;

    let params = new HttpParams();

    if (this.supervisor) {
      params = params.append('supervisor', this.supervisor._id.toString());
    }

    return this.http.get(url, {observe: 'response', params })
      .pipe(
        map(response => {
          return response.body as Employee[];
        })
      );
  }

  getEmployee(id: string): Observable<Employee> {
    const url = `${this.BASE_URL}employee/${id}`;

    return this.http.get(url)
      .pipe(
        map(response => {
          return response as Employee;
        })
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.BASE_URL}employee`;

    return this.http.post(url, employee)
      .pipe(
        map(response => {
          return response as Employee;
        })
      );
  }

}
