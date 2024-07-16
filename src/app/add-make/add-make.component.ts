import { Component, OnInit } from '@angular/core';
import { Make } from '../_model/make.model';
import { FormControl, NgForm } from '@angular/forms';
import { MakeServiceService } from '../_services/make-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-add-make',
  templateUrl: './add-make.component.html',
  styleUrls: ['./add-make.component.css']
})
export class AddMakeComponent implements OnInit {
   

  make : Make = {
    makeName : "",
  }

  // colorControl = new FormControl('warn' as ThemePalette);

  makeDetails: Make[] = []
  displayedColumns: string[] = ['id', 'name'];
  
  constructor(private makeService : MakeServiceService){}
  
  
  ngOnInit(): void {
    this.getAllMakes();
  }

  addMake(makeForm : NgForm){
    // console.log(makeForm.value);
    this.makeService.addMake(this.make).subscribe(
      (response)=>{
        console.log(response);
        this.getAllMakes();
        makeForm.reset();
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  public getAllMakes(){
    this.makeService.getAllMakes().subscribe(
      (response: Make[])=>{
        // console.log(response);
        this.makeDetails = response;
      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }


}
