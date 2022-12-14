import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit() {
  }
  beersPage() {
    this.router.navigateByUrl('/beer-list');
  }
  studentsPage() {
    this.router.navigateByUrl('/student-list');
  }
  logout() {
    this.router.navigateByUrl('/login').then(()=>{
      this.authService.logout();
    });
  }
}
