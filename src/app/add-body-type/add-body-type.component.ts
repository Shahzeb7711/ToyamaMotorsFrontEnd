import { Component, OnInit } from '@angular/core';
import { BodyType } from '../_model/body-type.model';
import { BodyTypeService } from '../_services/body-type.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-body-type',
  templateUrl: './add-body-type.component.html',
  styleUrls: ['./add-body-type.component.css']
})
export class AddBodyTypeComponent implements OnInit {

  bodyType : BodyType = {
    bodyTypeName : "",
    descriptionOfBodyType : "",
  }

  bodyTypeDetails: BodyType[] = []
  displayedColumns: string[] = ['id', 'name', "description"];
  
  constructor(private bodyTypeService : BodyTypeService){}
  
  
  ngOnInit(): void {
    this.getAllBodyTypes();
  }

  addBodyType(bodyTypeForm : NgForm){
    console.log(bodyTypeForm.value);
    this.bodyTypeService.addBodyType(this.bodyType).subscribe(
      (response)=>{
        bodyTypeForm.reset();
        console.log(response);
        this.getAllBodyTypes();
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  public getAllBodyTypes(){
    this.bodyTypeService.getAllBodyTypes().subscribe(
      (response: BodyType[])=>{
        console.log(response);
        this.bodyTypeDetails = response;
      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }
}
