import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService,
              private userAuth : UserAuthService,
              private router: Router){}

  ngOnInit(): void {
      
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuth.setRoles(response.roles);
        this.userAuth.setToken(response.token);
        console.log(response);

        const roles = response.roles; 
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sigupRouter() {
    this.router.navigate(['/addUser'])
  }
}
