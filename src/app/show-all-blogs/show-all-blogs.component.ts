import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../_services/blog-service.service';
import { Blog } from '../_model/blog.model';
import { BlogImageProcessingService } from '../_services/blog-image-processing.service';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-all-blogs',
  templateUrl: './show-all-blogs.component.html',
  styleUrls: ['./show-all-blogs.component.css']
})
export class ShowAllBlogsComponent implements OnInit {
  
  blogDetails : Blog[] = [];

  pageNumber : number = 0;

  constructor(private blogService : BlogServiceService,
    private blogImageProcessingService : BlogImageProcessingService,
    private router : Router) {}
  
  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs(){
    this.blogService.getAllBlogs(this.pageNumber).pipe(
      map((x: Blog[]) => x.map((blog: Blog) => this.blogImageProcessingService.createImages(blog)))
    ).subscribe(
      (response: Blog[])=> {
        console.log(response);
        response.forEach(p=>this.blogDetails.push(p));
      },(error : HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  showBlogDetails(blogId : any) {
    this.router.navigate(['/viewBlog', {blogId: blogId}]);
  }

  public loadMoreProduct(){
    this.pageNumber += 1;
    this.getAllBlogs();
    console.log("Load more button clicked");
  }



}
