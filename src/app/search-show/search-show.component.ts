import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-show',
  templateUrl: './search-show.component.html',
  styleUrls: ['./search-show.component.css']
})
export class SearchShowComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,private productService : ProductService, imageProcessingService : ImageProcessingService, private router : Router) {}

  searchKeyword: string = '';
  searchResults: Product[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchKeyword = params['keyword'];
      this.productService.searchProducts(this.searchKeyword)
        .subscribe(
          results => {
            this.searchResults = results;
          },
          error => {
            console.error('Error searching for products:', error);
          }
        );
    });
  }
  showProductDetails(productId : any) {
    this.router.navigate(['/viewDetailsHome', {productId: productId}])
  }

}
