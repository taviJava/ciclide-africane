import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../service/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: Contact = new Contact();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.contact = new Contact();
  }

// tslint:disable-next-line:typedef
  onSubmit() {
    this.contactService.save(this.contact).subscribe(data => {
      this.getContact();
    });
  }

  // tslint:disable-next-line:typedef
  getContact() {
    this.router.navigate(['contact']);
  }
}
