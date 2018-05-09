import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthGuard } from './share/auth.gaurd';
import { Router } from '@angular/router';
import { AuthService } from './share/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authGuard: AuthGuard) { }
  ngOnInit() {
    if (this.authGuard.canActivate()) {
      this.router.navigate(['/page/dashboard']);
    }
  }
}
