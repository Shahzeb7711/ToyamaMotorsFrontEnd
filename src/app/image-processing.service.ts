import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { FileHandle } from './_model/file-handle-model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product) {
    const imageResponses: any[] = product.imageResponse || [];

    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < imageResponses.length; i++) {
      const imageFileData = imageResponses[i];


      const imageBlob = this.dataURIToBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

      const url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile));

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: url
      }
      productImagesToFileHandle.push(finalFileHandle)

    }

    product.imageResponse = productImagesToFileHandle;
    return product;
    // return { ...product, productImages: productImagesToFileHandle };
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

