import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Button } from "@app/shared";

@Component({
  selector: 'app-contact-form',
  imports: [Button],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  baseUrl = "https://admin.controllegalcl.com/wp-json/api/v1/"
  http = inject(HttpClient);
  
  sendMockedData() {
    this.http.post(`${this.baseUrl}send-email`, {}).subscribe();   
  }
}
