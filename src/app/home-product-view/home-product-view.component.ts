import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BodyTypeService } from '../_services/body-type.service';
import { BodyType } from '../_model/body-type.model';

@Component({
  selector: 'app-home-product-view',
  templateUrl: './home-product-view.component.html',
  styleUrls: ['./home-product-view.component.css']
})
export class HomeProductViewComponent implements OnInit {
  
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

  bodyType : BodyType = {
    bodyTypeName : "",
    descriptionOfBodyType: "",
  }
  // imageProcessingService: any;
  // productService: any;

  productDetails: Product[] = [];

  chunkedProductDetails: any[][] = [];
  itemsPerChunk: number = 3;

  currentSlideIndex: number = 0;
  constructor(private activatedRoute : ActivatedRoute, private productService : ProductService, private imageProcessingService : ImageProcessingService, private router : Router, private bodyTypeService : BodyTypeService) {}

  ngOnInit(): void {
    
    this.product = this.activatedRoute.snapshot.data['product']
    console.log(this.product);
    this.getActivatedProduct();
    this.getAllBodyTypes();
  }
  

  productIndex = 0;

  changeIndex(index: any) {
    console.log('Changing index to:', index);
    this.productIndex = index;
    console.log('New index:', this.productIndex);
  }

  getActivatedProduct(){
    this.productService.getAllActivatedProducts(0).pipe(
      map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product)))

    ).subscribe(
      (response: Product[]) => {
        console.log(response);
        this.productDetails = response;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );;
  }

  getAllBodyTypes(){
    this.bodyTypeService.getAllBodyTypes().subscribe(
      (response : BodyType[])=>{
        console.log(response);
      }
    )
  }

  showProductDetails(productId : any) {
    this.router.navigate(['/viewDetailsHome', {productId: productId}])
  }

  chunk(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  nextSlide() {
    const carousel = document.querySelector('.carousel-inner') as HTMLElement;
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const totalSlides = carouselItems.length;
  
    if (this.currentSlideIndex < totalSlides - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0;
    }
  
    carouselItems.forEach((item, index) => {
      if (index === this.currentSlideIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

 


}
