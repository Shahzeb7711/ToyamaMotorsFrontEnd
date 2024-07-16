import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolveService } from './product-resolve.service';
import { UpdateProductDetailComponent } from './update-product-detail/update-product-detail.component';
import { AddMakeComponent } from './add-make/add-make.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { AddBodyTypeComponent } from './add-body-type/add-body-type.component';
import { ShowActivatedDeatilsComponent } from './show-activated-deatils/show-activated-deatils.component';
import { HomeProductViewComponent } from './home-product-view/home-product-view.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { ShowUserDetailsComponent } from './show-user-details/show-user-details.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ShowBlogsDetailsComponent } from './show-blogs-details/show-blogs-details.component';
import { BlogResolveService } from './blog-resolve.service';
import { AllCarsUserComponent } from './all-cars-user/all-cars-user.component';
import { SearchShowComponent } from './search-show/search-show.component';
import { ShowAllBlogsComponent } from './show-all-blogs/show-all-blogs.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_USER'] } },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] },
    resolve: {
      product: ProductResolveService
    }
  },
  { path: 'productDetails', component: ShowProductDetailsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'activatedProductDetails', component: ShowActivatedDeatilsComponent },
  {
    path: 'updateProductDetails', component: UpdateProductDetailComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] },
    resolve: {
      product: ProductResolveService
    }
  },
  { path: 'addMake', component: AddMakeComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'addFuel', component: AddFuelComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'addBodyType', component: AddBodyTypeComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  {
    path: 'viewDetailsHome', component: HomeProductViewComponent, resolve: {
      product: ProductResolveService
    }
  },
  { path: 'addUser', component: UserCreationComponent },
  { path: 'userDetails', component: ShowUserDetailsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'addBlog', component: AddBlogComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  {
    path: 'viewBlog', component: ShowBlogsDetailsComponent, resolve: {
         blog: BlogResolveService
    }
  },
  {
    path: 'home', component: HomeComponent, resolve: {
         blog: BlogResolveService,
         product: ProductResolveService
    }
  },
  
  {
    path: 'viewAllCars', component: AllCarsUserComponent, resolve: {
      product: ProductResolveService
    }
  },
  { path: 'showSearch', component: SearchShowComponent },
  { path: 'showAllBlogs', component: ShowAllBlogsComponent },
  { path: 'ourServices', component: OurServicesComponent},
  { path: 'aboutUs', component: AboutComponent},
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }