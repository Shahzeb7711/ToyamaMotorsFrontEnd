import { FileHandle } from "./file-handle-model";

export interface Blog {
    // private String blogName;

	// private String blogTitle;

	// private String blogContent;
    blogId:number,
    blogName : string,
    blogTitle : string,
    blogContent : string,
    para2 : string,
    para3 : string,
    dataOfPosting : string,
    imageResponse : FileHandle[],
}