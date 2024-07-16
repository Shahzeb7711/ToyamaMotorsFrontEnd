import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService: ProductService, private imageProcessingService : ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    // throw new Error('Method not implemented.');
    const id = route.paramMap.get("productId");

    if (id) {
      return this.productService.getProductById(id).pipe(
        map(p => this.imageProcessingService.createImages(p))
      );
    }
    else {
      return of(this.getProductDetails());
    }
  }
  getProductDetails() {
    return {
      productId:"",
      productName: "",
      productType: "",
      productDescription:"",
      productDiscountedPrice: 0,
      productActualPrice: 0,
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
      imageResponse: [],
    }
  }
}
