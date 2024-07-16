import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_model/product.model';
import { FileHandle } from '../_model/file-handle-model';
import { MakeServiceService } from '../_services/make-service.service';
import { FuelService } from '../_services/fuel.service';
import { BodyTypeService } from '../_services/body-type.service';
import { Make } from '../_model/make.model';
import { Fuel } from '../_model/fuel.model';
import { BodyType } from '../_model/body-type.model';


@Component({
  selector: 'app-update-product-detail',
  templateUrl: './update-product-detail.component.html',
  styleUrls: ['./update-product-detail.component.css']
})
export class UpdateProductDetailComponent implements OnInit {

  

  product: Product = {
    productId:"",
    productName : "",
    productType : "",
    productDescription : "",
    productDiscountedPrice : 0,
    productActualPrice : 0,
    yearOfManufacture:"",
    mileage: "",
    seater:"",
    engineType:"",
    engineHorsePower:"",
    transmission:"",
    fuelType:"",
    capacity:"",
    isinfotainmentSystem:false,
    isclimateControl:false,
    makeName:"",
    isSunroof:false,
    extraFeature:"",
    color:"",
    bodyType:"",
    wheels:"",
    lighting:"",
    overallCondition:"",
    productStatus:true,
    imageResponse : []
  }



  makeDetails: Make[] = [];
  fuelDetails: Fuel[] = [];
  bodyTypeDetails: BodyType[] = [];
  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private makeService: MakeServiceService,
    private fuelService: FuelService,
    private bodyTypeService: BodyTypeService,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    ) { }
  
  // Add a property to store the form values
// Add a property to store the image

tempImages: FileHandle[] = [];


// Modify ngOnInit to store the initial product data
ngOnInit(): void {
  this.product = this.activatedRoute.snapshot.data['product'];
  this.getAllMakes();
  this.getAllFuels();
  this.getAllBodyTypes();

}

  updateProductDetails(productForm : NgForm){
    const data = this.prepareFormData(this.product); 
    this.productService.updateProduct(data).subscribe(
      (response : any) => {
        productForm.reset();
        this.product.imageResponse = [];
      },
      (error : HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product : Product):FormData{
    const formData = new FormData();
    formData.append('product',
    new Blob([JSON.stringify(product)], {type: 'application/json'}))

    for(var i = 0; i < product.imageResponse.length; i++) {
      formData.append('imageFile', product.imageResponse[i].file, 
      product.imageResponse[i].file.name)
    }
    return formData;
  }

  onFileSected(event:any){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle : FileHandle = {
        file : file,
        url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.product.imageResponse.push(fileHandle);
    }
  }

  removeImages(i : number) {
    this.product.imageResponse.splice(i, 1);
  }

  fileDropped(fileHandle : FileHandle) {
    this.product.imageResponse.push(fileHandle);
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
