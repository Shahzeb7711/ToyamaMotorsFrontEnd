import { FileHandle } from "./file-handle-model";

export interface Product {
    productId : string,
    productName:string,
    productType:string,
    productDescription:string,
    productDiscountedPrice:number,
    productActualPrice:number,
    yearOfManufacture:string,
    mileage: string,
    seater:string,
    engineType:string,
    engineHorsePower:string,
    transmission:string,
    fuelType:string,
    capacity:string,
    isinfotainmentSystem:boolean,
    isclimateControl:boolean,
    makeName:string,
    isSunroof:boolean,
    extraFeature:string,
    color:string,
    bodyType:string,
    wheels:string,
    lighting:string,
    overallCondition:string,
    productStatus:boolean,
    imageResponse : FileHandle[],
    // prouductImages : FileHandle[],
}

  
//   export interface Product {
//     productId: string;
//     productName: string;
//     yearOfManufacture: string;
//     mileage: string;
//     seater: string;
//     engineType: string;
//     engineHorsePower: string;
//     transmission: string;
//     fuelType: string;
//     capacity: string;
//     isinfotainmentSystem: boolean;
//     isclimateControl: boolean;
//     productType: string;
//     productDiscountedPrice: number;
//     productActualPrice: number;
//     productDescription: string;
//     makeName: string;
//     productStatus: boolean;
//     isSunroof: boolean;
//     extraFeature: string;
//     color: string;
//     bodyType: string;
//     wheels: string;
//     lighting: string;
//     overallCondition: string;
//     imageResponse: FileHandle[];
//   }
  
//   export interface Pageable {
//     sort: Sort;
//     offset: number;
//     pageNumber: number;
//     pageSize: number;
//     unpaged: boolean;
//     paged: boolean;
//   }
  
//   export interface Sort {
//     empty: boolean;
//     unsorted: boolean;
//     sorted: boolean;
//   }
  
//   export interface ProductResponseList {
//     content: Product[];
//     pageable: Pageable;
//     last: boolean;
//     totalPages: number;
//     totalElements: number;
//     size: number;
//     number: number;
//     sort: Sort;
//     first: boolean;
//     numberOfElements: number;
//     empty: boolean;
//   }
  
//   export interface ProductResponse {
//     pageNumber: number;
//     pageSize: number;
//     sortDir: string;
//     sortBy: string;
//     startDate: string;
//     endDate: string;
//     productResponseList: ProductResponseList;
//   }