import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { UserAuthService } from './_services/user-auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from './show-product-images-dialog/show-product-images-dialog.component';
import { UpdateProductDetailComponent } from './update-product-detail/update-product-detail.component';
import { AddMakeComponent } from './add-make/add-make.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { AddBodyTypeComponent } from './add-body-type/add-body-type.component';
import { FooterComponent } from './footer/footer.component';
import { ShowActivatedDeatilsComponent } from './show-activated-deatils/show-activated-deatils.component';
import { HomeProductViewComponent } from './home-product-view/home-product-view.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { ShowUserDetailsComponent } from './show-user-details/show-user-details.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ShowBlogsDetailsComponent } from './show-blogs-details/show-blogs-details.component';
import { AllCarsUserComponent } from './all-cars-user/all-cars-user.component';
import { SearchShowComponent } from './search-show/search-show.component';
import { ShowAllBlogsComponent } from './show-all-blogs/show-all-blogs.component';
import { AboutComponent } from './about/about.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContactComponent } from './contact/contact.component';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddNewProductComponent,
    DragDirective,
    ShowProductDetailsComponent,
    ShowProductImagesDialogComponent,
    UpdateProductDetailComponent,
    AddMakeComponent,
    AddFuelComponent,
    AddBodyTypeComponent,
    FooterComponent,
    ShowActivatedDeatilsComponent,
    HomeProductViewComponent,
    UserCreationComponent,
    ShowUserDetailsComponent,
    AddBlogComponent,
    ShowBlogsDetailsComponent,
    AllCarsUserComponent,
    SearchShowComponent,
    ShowAllBlogsComponent,
    AboutComponent,
    OurServicesComponent,
    ShowActivatedDeatilsComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatPaginatorModule,
    NgxUiLoaderModule,
    TranslateModule.forRoot({
      loader : {
        provide : TranslateLoader,
        useFactory : HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground : true,
    }),
    
  ],
  providers: [
    HttpClient,
    UserAuthService, // Add this line to provide UserAuthService
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
