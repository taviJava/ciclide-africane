import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../service/contact.service';
import {Message} from '../../model/message';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: Contact = new Contact();
  message: Message = new Message();
  lat = 28.704060;
  long = 77.102493;
  googleMapType = 'satellite';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.contact = new Contact();
    this.message = new Message();
    this.getContact();
  }
// tslint:disable-next-line:typedef
  add() {
    this.router.navigate(['addContact']);
  }
  // tslint:disable-next-line:typedef
  getContact(){
    this.contactService.getContact().subscribe(data => {
      this.contact = new Contact();
      this.contact = JSON.parse(data) as Contact;
    });
  }
  // tslint:disable-next-line:typedef
  send(){
  this.contactService.sendMessage(this.message).subscribe(result => {
    console.log('mesajTrimis');
  });
}
}
