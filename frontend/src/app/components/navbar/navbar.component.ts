import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supervisor } from 'src/app/models/supervisor';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  supervisor?: Supervisor | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMe();
    this.authService.supervisorObject.subscribe({
      next: (supervisor) => {
        this.supervisor = supervisor;
      }
    })
  }

  getMe() {
    if (localStorage.getItem('accessToken')) {
      this.authService.me().subscribe()
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        this.authService.supervisorObject.next(null);
        this.router.navigate(['/login']);
      }
    })
  }

}
