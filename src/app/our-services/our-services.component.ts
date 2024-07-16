import { Component, OnInit } from '@angular/core';
import { Contact } from '../_model/contact.model';
import { ContactService } from '../_services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

  contacts : Contact = {
    name : "",
    contact : "",
  }

  contactDetails:Contact[] = [];

  constructor(private contactService: ContactService) {
    this.getAllContacts();
  }

  displayedColumns : string[] = ["name", "contact"]

  ngOnInit(): void {

  }

  public getAllContacts() {
    this.contactService.getAllContacts().subscribe(
      (response)=>{
        console.log(response);
        this.contactDetails = response
      },
      (error : HttpErrorResponse)=> {
        console.log(error);
      }
    )
  }

}
