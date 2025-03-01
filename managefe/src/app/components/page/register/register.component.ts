import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl:'./register.component.css'
})
export class RegisterComponent {
  userData = {
   username: '',
    email: '',
    password: ''
  };
  private router: any;

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('Sending data:', this.userData);
    this.http.post('http://localhost:8080/auth/register', this.userData).subscribe({
      next: (response) => console.log('Success:', response),
      
    });
    this.router.navigate(['/data-table']);
  }
}
