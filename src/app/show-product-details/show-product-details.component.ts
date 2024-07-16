import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  productDetails: Product[] = []
  displayedColumns: string[] = ['id', 'name', 'type', 'dicountedPrice', 'actualPrice', 'images', 'update', 'delete'];

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router : Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().
      pipe(
        map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product)))

      )
      .subscribe(
        (response: Product[]) => {
          console.log(response);
          this.productDetails = response;
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  deleteProduct(element: any) {
    this.productService.deactivateProduct(element).subscribe(
      (response) => {
        console.log('Product deactivated successfully:', response);
        this.getAllProducts();
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

  editProductDeatails(productId: number) {
    this.router.navigate(['/updateProductDetails/', {productId: productId}])
  }

  // deleteProductAndReviweIt(element: Product) {
  //   if (element.productStatus === true) {
  //     // Product status is true, deactivate it
  //     this.productService.deactivateProduct(element.productId).subscribe(
  //       (response) => {
  //         console.log('Product deactivated successfully:', response);
  //         this.getAllProducts();
  //       },
  //       (error) => {
  //         console.error('Error deactivating product:', error);
  //       }
  //     );
  //   } else {
  //     // Product status is false, activate it
  //     this.productService.activateProduct(element.productId).subscribe(
  //       (response) => {
  //         console.log('Product activated successfully:', response);
  //         this.getAllProducts();
  //       },
  //       (error) => {
  //         console.error('Error activating product:', error);
  //       }
  //     );
  //   }
  // }

  


}
