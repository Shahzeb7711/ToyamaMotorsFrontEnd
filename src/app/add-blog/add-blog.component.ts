import { Component, OnInit } from '@angular/core';
import { Blog } from '../_model/blog.model';
import { BlogServiceService } from '../_services/blog-service.service';
import { NgForm } from '@angular/forms';
import { FileHandle } from '../_model/file-handle-model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  
  
  constructor(private blogService: BlogServiceService, private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  blog: Blog = {
    blogId: 0,
    blogName : "",
    blogTitle : "",
    blogContent : "",
    para2: "",
    para3: "",
    dataOfPosting : "",
    imageResponse : [],
  }

  addBlog(blogForm:NgForm){
    const data = this.prepareFormData(this.blog);
    this.blogService.addBlogs(data).subscribe(
      (response: any) => {
        blogForm.reset();
        this.snackBar.open('Blog added successfully!', 'Close', {
          duration: 3000, 
        });
        this.blog.imageResponse = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snackBar.open('Error occured please try agian letter!', 'Close', {
          duration: 3000, 
        });
      }
    )
  }


  prepareFormData(blog: Blog): FormData {
    const formData = new FormData();
    formData.append('blog',
      new Blob([JSON.stringify(blog)], { type: 'application/json' }))

    for (var i = 0; i < blog.imageResponse.length; i++) {
      formData.append('imageFile', blog.imageResponse[i].file,
        blog.imageResponse[i].file.name)
    }
    return formData;
  }


  onFileSected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.blog.imageResponse.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.blog.imageResponse.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.blog.imageResponse.push(fileHandle);
  }

}
