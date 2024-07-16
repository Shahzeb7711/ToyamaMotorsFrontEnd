import { Injectable } from '@angular/core';
import { Blog } from './_model/blog.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { BlogServiceService } from './_services/blog-service.service';
import { BlogImageProcessingService } from './_services/blog-image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BlogResolveService implements Resolve<Blog> {

  constructor(private blogService: BlogServiceService, private blogimageProcessingService : BlogImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Blog> {
    // throw new Error('Method not implemented.');
    const id = route.paramMap.get("blogId");

    if(id) {
      return this.blogService.getBlogById(id).pipe(
        tap(blog => console.log('Resolved Blog:', blog)), // Log the resolved blog
        map(b => this.blogimageProcessingService.createImages(b))
      );
    }
    else {
      return of(this.getBlogDetails());
    }
  }

  getBlogDetails() {
    return {
      blogId:0,
      blogName : "",
      blogTitle : "",
      blogContent : "",
      para2: "",
      para3: "",
      dataOfPosting : "",
      imageResponse : [],
    }
  }


}
