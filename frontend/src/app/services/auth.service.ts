import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Supervisor } from '../models/supervisor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.apiUrl;

  private _supervisorObject = new BehaviorSubject<Supervisor | null>(null);

  constructor(
    private http: HttpClient
  ) { }

  login(supervisorLogin: any): Observable<{ accessToken: string; refreshToken: string; supervisor: Supervisor }> {
    return this.http.post<{ accessToken: string; refreshToken: string; supervisor: Supervisor }>(`${this.BASE_URL}login`, supervisorLogin)
      .pipe(tap(loginData => {
        if (loginData.accessToken && loginData.refreshToken) {
          localStorage.setItem('accessToken', loginData.accessToken);
          localStorage.setItem('refreshToken', loginData.refreshToken);
        }
        this._supervisorObject.next(loginData.supervisor)
      }))
  }

  refresh(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<{ accessToken: string }>(`${this.BASE_URL}refresh`, { refreshToken })
      .pipe(tap(tokenData => {
        if (tokenData && tokenData.accessToken) {
          localStorage.setItem('accessToken', tokenData.accessToken)
        }
      }))
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return this.http.post<{ refreshToken: string; }>(`${this.BASE_URL}logout`, { refreshToken })
  }

  me(): Observable<{ supervisor: Supervisor }> {
    return this.http.get<{ supervisor: Supervisor }>(`${this.BASE_URL}me`)
      .pipe(tap(supervisor => {
        this._supervisorObject.next(supervisor.supervisor)
      }))
  }

  isLoggedIn(): boolean {
    this.me().subscribe();
    return this._supervisorObject.value !== null;
  }

  get supervisorObject(): BehaviorSubject<Supervisor | null> {
    return this._supervisorObject;
  }

  getSupervisorId(): string {
    return this._supervisorObject.value!._id;
  }

}
