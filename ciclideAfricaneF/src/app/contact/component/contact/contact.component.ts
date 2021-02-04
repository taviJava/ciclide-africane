import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../service/contact.service';
import {Message} from '../../model/message';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  closeResult = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService,
              private modalService: NgbModal) {
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
  getContact() {
    this.contactService.getContact().subscribe(data => {
      this.contact = new Contact();
      this.contact = JSON.parse(data) as Contact;
    });
  }

  // tslint:disable-next-line:typedef
  send(content) {
    this.contactService.sendMessage(this.message).subscribe(result => {
      const data = JSON.parse(result);
      this.message = data.message;
      this.open(content);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

// tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // tslint:disable-next-line:typedef
  goToHomePage(content){
    this.router.navigate(['']);
  }
}
