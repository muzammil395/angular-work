import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  submitted = false;

  submit(event: Event): void {
    event.preventDefault();
    this.submitted = true;
  }
}
