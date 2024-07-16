import { Component, OnInit } from '@angular/core';
import { Fuel } from '../_model/fuel.model';
import { FuelService } from '../_services/fuel.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.css']
})
export class AddFuelComponent implements OnInit {
  fuel : Fuel = {
    fuelTypeName : "",
  }

  fuelDetails: Fuel[] = []
  displayedColumns: string[] = ['id', 'name'];
  
  constructor(private fuelService : FuelService){}
  
  
  ngOnInit(): void {
    this.getAllFuels();
  }

  addFuel(fuelForm : NgForm){
    console.log(fuelForm.value);
    this.fuelService.addFuel(this.fuel).subscribe(
      (response)=>{
        console.log(response);
        this.getAllFuels();
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  public getAllFuels(){
    this.fuelService.getAllFuelTypes().subscribe(
      (response: Fuel[])=>{
        console.log(response);
        this.fuelDetails = response;
      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

}
