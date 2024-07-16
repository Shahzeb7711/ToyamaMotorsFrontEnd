import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-cars-user',
  templateUrl: './all-cars-user.component.html',
  styleUrls: ['./all-cars-user.component.css']
})
export class AllCarsUserComponent implements OnInit {

  ngOnInit(): void {
    this.getActivatedProduct()
  }

  pageNumber:number = 0;
  showLoadButton:boolean = false;
  productDetails: Product[] = [];

  constructor(private productService : ProductService, 
    private imageProcessingService : ImageProcessingService,
    private router : Router,
   ) {}

  public getActivatedProduct(searchKeyword: any=""){
    this.productService.getAllActivatedProducts(this.pageNumber, searchKeyword).pipe(
      map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product)))

    ).subscribe(
      (response: Product[]) => {
        console.log(response);
        response.forEach(p=>this.productDetails.push(p));
        // this.productDetails.push(...response);
        // this.productDetails = response;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );;
  }

  showProductDetails(productId : any) {
    this.router.navigate(['/viewDetailsHome', {productId: productId}])
  }


  public loadMoreProduct(){
    this.pageNumber += 1;
    this.getActivatedProduct();
    console.log("Load more button clicked");
  }

  searchByKeyword(searchKeyword : any):void {
    console.log(searchKeyword)
    this.pageNumber = 0;
    this.productDetails = [];
    this.getActivatedProduct(searchKeyword)
  } 

}
