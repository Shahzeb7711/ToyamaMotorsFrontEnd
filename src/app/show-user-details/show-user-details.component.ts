import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserEntity } from '../_model/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css']
})
export class ShowUserDetailsComponent implements OnInit {
  
  userDetails : UserEntity[] = [];

  displayedColumns: string[] = ['id', 'name', 'email',  'status', 'mobileNo', 'phoneNo', 'fax', 'address', 'country', 'userSinginDate'];

  constructor(private userService : UserService) {}


  ngOnInit(): void {
   this.getAllUsers();
  }

  public getAllUsers(){
    this.userService.getAllUser().subscribe(
      (response: UserEntity[])=>{
        console.log(response);
        this.userDetails = response;
      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }



  

}
