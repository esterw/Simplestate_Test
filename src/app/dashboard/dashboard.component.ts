import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../share/user.model';
import { LoginService } from '../share/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../share/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;
  constructor(private loginService: LoginService, private router: Router, private auth:AuthService) { }

  ngOnInit() {
    this.user = new User();
    if (this.auth.isAuthenticated()) {
      this.user.first_name = localStorage.getItem('fname');
      this.user.last_name = localStorage.getItem('lname');
    }
    else {
      this.subscription = this.loginService.CurrentUserChanged.subscribe(
        currentUser => this.user = currentUser);
      this.user = this.loginService.CurrentUser;
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    this.router.navigate(['/auth/login']);
  }
  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
