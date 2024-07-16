import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserEntity } from '../_model/user.model';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  
  user : UserEntity = {
    username : "",
    email : "",
    password : "",
    mobileNo : "",
    phoneNo : "",
    fax : "",
    address : "",
    country : "",
    userSinginDate: ""
  }


  constructor(private userService : UserService,
    private router:Router,
    private snackBar : MatSnackBar,
    private ngxLoaderService : NgxUiLoaderService){}

  ngOnInit(): void {
    
  }

  createUser(userForm : NgForm){
    // console.log(userForm.value);
    this.userService.createUser(this.user).subscribe(
      (response)=>{
        this.snackBar.open('User created successfully!', 'Close', {
          duration: 3000, 
        });
        userForm.reset();
      },
      (error)=>{
        this.snackBar.open('Something went wrong. Please try again.', 'Close', {
          duration: 3000,
        });
        console.log(error);
      }

    )
  }

  loginRouter(){
    this.router.navigate(['/login']);
  }




}
