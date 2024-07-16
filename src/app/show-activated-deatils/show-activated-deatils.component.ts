import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-show-activated-deatils',
  templateUrl: './show-activated-deatils.component.html',
  styleUrls: ['./show-activated-deatils.component.css']
})
export class ShowActivatedDeatilsComponent {

  productDetails: Product[] = []
  displayedColumns: string[] = ['id', 'name', 'type', 'dicountedPrice', 'actualPrice', 'images', 'update', 'delete'];

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router : Router) { }


    currentPage = 0;
    pageSize = 10;
    totalItems = 0;

    pageNumber = 0;

    searchKey = "";

    showTables = false;


  ngOnInit(): void {
    this. getAllActivatedProducts();
  }

   getAllActivatedProducts(): void {
    this.productService.getAllActivatedProducts(this.pageNumber).pipe(
      map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product)))

    ).subscribe(
      (response: Product[]) => {
        console.log(response);
        response.forEach(p=>this.productDetails.push(p));
        this.showTables = true;
        // this.productDetails.push(...response);
        // this.productDetails = response;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );;
  }
  // getAllActivatedProducts(pageIndex: number, pageSize: number) {
  //   this.productService.getAllActivatedProducts(pageIndex, pageSize)
  //     .pipe(
  //       map((response: any) => {
  //         this.totalItems = response.totalElements;
  //         return response.content;
  //       }),
  //       map((products: Product[]) => products.map(product => this.imageProcessingService.createImages(product)))
  //     )
  //     .subscribe(
  //       (response: Product[]) => {
  //         console.log(response);
  //         this.productDetails = response;
  //       }, (error: HttpErrorResponse) => {
  //         console.log(error);
  //       }
  //     );
  // }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex; // Update current page with the new page index
    this.pageSize = event.pageSize; // Update page size if needed
    this.getAllActivatedProducts();
  }

  deleteProduct(element: any) {
    this.productService.deactivateProduct(element).subscribe(
      (response) => {
        console.log('Product deactivated successfully:', response);
        this.getAllActivatedProducts();
      },
      (error) => {
        console.error('Error deactivating product:', error);
      }
    );
  }

  showImagesInDialog(product: Product) {
    console.log("Product images before opening dialog:", product.imageResponse);
    this.dialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.imageResponse
      },
      height: '500px',
      width: '800px'
    })
  }

  editProductDeatails(productId: any) {
    this.router.navigate(['/updateProductDetails/', {productId: productId}])
  }


  public loadMoreProduct(){
    this.pageNumber += 1;
    this.getAllActivatedProducts();
    console.log("Load more button clicked");
  }
}
