import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { RequestOptions } from "@angular/http";
import { User } from "./user.model";
import { Subject } from "rxjs/Subject";


@Injectable()
export class LoginService {

    CurrentUser: User = new User();
    CurrentUserChanged= new Subject<User>()
    constructor(public http: HttpClient) { }

    Login(email: string, password: string) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.post('http://18.218.39.178/api/user/auth/login', {'email': email,'password': password}, { headers: headers })       
        
    }
    setCurrentUser(cuurentUser: User) {
        localStorage.setItem('token', cuurentUser.access_token);
        localStorage.setItem('fname', cuurentUser.first_name);
        localStorage.setItem('lname', cuurentUser.last_name);
        this.CurrentUser = cuurentUser;
        this.CurrentUserChanged.next(cuurentUser);
    }


}

