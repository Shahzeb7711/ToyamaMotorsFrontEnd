import { Component, OnInit } from '@angular/core';
import { Blog } from '../_model/blog.model';
import { BlogServiceService } from '../_services/blog-service.service';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogImageProcessingService } from '../_services/blog-image-processing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-blogs-details',
  templateUrl: './show-blogs-details.component.html',
  styleUrls: ['./show-blogs-details.component.css']
})
export class ShowBlogsDetailsComponent implements OnInit {
  
  blogDetails : Blog[] = [];

  blog : Blog = {
    blogId : 0,
    blogName : '',
    blogTitle : '',
    blogContent : '',
    para2:'',
    para3:'',
    dataOfPosting : '',
    imageResponse : []
  }
  
  pageNumber: number = 0;
  

  constructor(private activatedRoute : ActivatedRoute, private blogService: BlogServiceService, private blogImageProcessingService: BlogImageProcessingService){ }

  ngOnInit(): void {
    this.blog = this.activatedRoute.snapshot.data['blog'];
    console.log(this.blog);
    // this.getAllBlogs();
  }

  getAllBlogs(){
    this.blogService.getAllBlogs(this.pageNumber).pipe(
      map((x: Blog[]) => x.map((blog: Blog) => this.blogImageProcessingService.createImages(blog)))
    ).subscribe(
      (response: Blog[])=> {
        // console.log(response);
        response.forEach(b=>this.blogDetails.push(b))
      },(error : HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  public loadMoreProduct(){
    this.pageNumber += 1;
    this.getAllBlogs();
    // this.blogDetails= []
    console.log("Load more button clicked");
  }
}
