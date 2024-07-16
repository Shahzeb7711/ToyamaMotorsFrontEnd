import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product} from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Blog } from '../_model/blog.model';
import { BlogImageProcessingService } from '../_services/blog-image-processing.service';
import { BlogServiceService } from '../_services/blog-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  productDetails: Product[] = [];

  blogDetails : Blog[] = [];

  showLogo: boolean = false;

  constructor(private productService : ProductService, 
    private imageProcessingService : ImageProcessingService,
    private router : Router,
    private blogImageProcessingService: BlogImageProcessingService,
    private blogService: BlogServiceService){ }

  ngOnInit(): void {
    this.getActivatedProduct();
    this.getAllBlogs();
  }

  // public getActivatedProduct(){
  //   this.productService.getAllActivatedProducts().pipe(
  //     map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product)))

  //   ).subscribe(
  //     (response: Product[]) => {
  //       console.log(response);
  //       this.productDetails = response;
  //     }, (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );;
  // }

  public getActivatedProduct() {
  this.productService.getAllActivatedProducts(0).pipe(
    map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
  ).subscribe(
    (response: Product[]) => {
      console.log(response);
      this.productDetails = response;
    }, 
    (error: HttpErrorResponse) => {
      console.log(error);
    }
  );
}

  getAllBlogs(){
    this.blogService.getAllBlogs(0).pipe(
      map((x: Blog[]) => x.map((blog: Blog) => this.blogImageProcessingService.createImages(blog)))
    ).subscribe(
      (response: Blog[])=> {
        console.log(response);
        this.blogDetails = response;
      },(error : HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  showProductDetails(productId : any) {
    this.router.navigate(['/viewDetailsHome', {productId: productId}])
  }

  showBlogDetails(blogId : any) {
    this.router.navigate(['/viewBlog', {blogId: blogId}]);
  }

  showAllCars() {
    this.router.navigate(['/viewAllCars'])
  }

  showAllBlogs() {
    this.router.navigate(['/showAllBlogs'])
  }

  //  /  /aboutUs

  showAllAboutUs() {
    this.router.navigate(['/aboutUs'])
  }

  
}
