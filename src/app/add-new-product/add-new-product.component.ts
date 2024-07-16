import { Component, OnInit, Sanitizer } from '@angular/core';
import { Product } from '../_model/product.model';
import { Form, NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle-model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MakeServiceService } from '../_services/make-service.service';
import { Make } from '../_model/make.model';
import { FuelService } from '../_services/fuel.service';
import { Fuel } from '../_model/fuel.model';
import { BodyType } from '../_model/body-type.model';
import { BodyTypeService } from '../_services/body-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productId:"",
    productName: "",
    productType: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    yearOfManufacture: "",
    mileage: "",
    seater: "",
    engineType: "",
    engineHorsePower: "",
    transmission: "",
    fuelType: "",
    capacity: "",
    isinfotainmentSystem: false,
    isclimateControl: false,
    makeName: "",
    isSunroof: false,
    extraFeature: "",
    color: "",
    bodyType: "",
    wheels: "",
    lighting: "",
    overallCondition: "",
    productStatus:true,
    imageResponse: []
  }

  currentStep: number = 1;
  maxStep: number = 5;


  makeDetails: Make[] = [];
  fuelDetails: Fuel[] = [];
  bodyTypeDetails: BodyType[] = [];

  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private makeService: MakeServiceService,
    private fuelService: FuelService,
    private bodyTypeService: BodyTypeService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product']
    this.getAllMakes();
    this.getAllFuels();
    this.getAllBodyTypes();
  }

  addProduct(productForm: NgForm) {
    const data = this.prepareFormData(this.product);
    this.productService.addProduct(data).subscribe(
      (response: any) => {
        this.snackBar.open('Car added successfully!', 'Close', {
          duration: 3000, 
        });
        productForm.reset();
        
        this.product.imageResponse = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snackBar.open('Something went wrong please try agian later', 'Close', {
          duration: 3000, 
        });
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('product',
      new Blob([JSON.stringify(product)], { type: 'application/json' }))

    for (var i = 0; i < product.imageResponse.length; i++) {
      formData.append('imageFile', product.imageResponse[i].file,
        product.imageResponse[i].file.name)
    }
    return formData;
  }




  onFileSected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.product.imageResponse.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.product.imageResponse.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.imageResponse.push(fileHandle);
  }


  nextStep() {
    if (this.currentStep < this.maxStep) { // Define maxStep as the maximum step number
      this.currentStep++;
    }
  }

  prevStep() {
    this.currentStep--;
  }

  getAllMakes() {
    this.makeService.getAllMakes().subscribe(
      (response: Make[]) => {
        console.log(response);
        this.makeDetails = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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

  getAllBodyTypes(){
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
