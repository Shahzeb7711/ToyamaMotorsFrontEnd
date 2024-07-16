import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { ShowProductDetailsComponent } from '../show-product-details/show-product-details.component';
import { ShowActivatedDeatilsComponent } from '../show-activated-deatils/show-activated-deatils.component';
import { TranslateService } from '@ngx-translate/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userService: UserService;
  constructor(private userAuthService: UserAuthService, private router: Router, userService: UserService, private productService: ProductService
       , private translateService: TranslateService
    ) {
    this.userService = userService;
  }

  keyword: string = "";

  searchResults: Product[] = [];

  lang = ""


  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logOut() {
    this.userAuthService.clear();
    this.router.navigate(['/']);

  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  changeLang(lang : any){
    const selectedLanguage = lang.target.value; 
    localStorage.setItem('lang', selectedLanguage)
    this.translateService.use(selectedLanguage);

  }
}
