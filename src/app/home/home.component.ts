import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../share/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { User } from '../share/user.model';
import { AuthService } from '../share/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private loginService: LoginService, private auth: AuthService, private router: Router) {

  }
  errMssg = "";
  loading = false;
  onSubmit(loginForm: NgForm) {
    this.errMssg = "";
    if (loginForm.valid) {
      this.loading = true;
      if (loginForm.value.password == "123456") {
        this.loginService.Login(loginForm.value.email, loginForm.value.password).subscribe(
          (response: User) => {
            this.loading = false;
            this.loginService.setCurrentUser(response);
            if (this.auth.isAuthenticated()) {
              this.router.navigate(['/page/dashboard']);
            }
            return response;
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            this.loading = false;
            if (err.status == 401)
              this.errMssg = "Email or password is incorrect ):"
            else
              this.errMssg = "Something bad ):"
          }
        );
      }
      else {
        this.loading = false;
        this.errMssg = "Email or password is incorrect ):"
      }
    }
    else{
      console.log("invalid");
      
    }
  }

  ngOnInit() {
  }

}
