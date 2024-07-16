import { Component, OnInit } from '@angular/core';
import { Contact } from '../_model/contact.model';
import { ContactService } from '../_services/contact.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts : Contact = {
    name : "",
    contact : ""

  }


  contactDetails : Contact[] = []
  displayedColumns : string[] = ["id", "name", "contact"]

  constructor(private contactService : ContactService) {
    this.getAllContacts()
  }

  ngOnInit(): void {
    
  }

  addContact(contactForm : NgForm) {
    console.log(contactForm.value)
    this.contactService.addContact(this.contacts).subscribe(
      (response)=>{
        console.log(response)
        this.getAllContacts()
        contactForm.reset()
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
      }
    )
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
