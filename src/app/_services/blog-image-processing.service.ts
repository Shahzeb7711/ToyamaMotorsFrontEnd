import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Blog } from '../_model/blog.model';
import { FileHandle } from '../_model/file-handle-model';

@Injectable({
  providedIn: 'root'
})
export class BlogImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(blog : Blog) {
    const imageResponses : any[] = blog.imageResponse || [];

    const blogImageToFileHandle: FileHandle[] = [];

    for (let i = 0; i < imageResponses.length; i++) {
      const imageFileData = imageResponses[i];


      const imageBlob = this.dataURIToBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

      const url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile));

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: url
      }
      blogImageToFileHandle.push(finalFileHandle);

    }
    blog.imageResponse = blogImageToFileHandle;
    return blog;
  }

  public dataURIToBlob(picByte: any, imageType: any) {
    const byteString = window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    // const blob = new Blob([int8Array], { type: imageType })
    // return blob;

    return new Blob([int8Array], { type: imageType });
  }
}
