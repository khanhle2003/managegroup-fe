import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtDeocderService } from '../../../services/jwt-deocder.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private jwtDecodeService = inject(JwtDeocderService);
  decodedToken:any;
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router){
  //   this.decodedToken = this.jwtDecodeService.decodeToken('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImtoYW5oMTIzIiwic3ViIjoia2hhbmgxMjMiLCJpYXQiOjE3MzUxODUxOTUsImV4cCI6MTczNTIyMTE5NX0.EjzDsU6W-o74GgeW9u5Nen6PdGMq9eXOQzWFVZ50mZ8')

  }

login() {
  const credentials = { username: this.username, password: this.password };

  this.http.post('http://localhost:8080/auth/login', credentials, {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'text'
  }).subscribe({
    next: (response: any) => {
      this.router.navigate(['/main'], { replaceUrl: true }).then(() => {
        location.reload();
      });

      console.log('API response:', response);
      if (response.body && response.body.token) {
         localStorage.setItem('jwt', response.body.token);
        this.decodedToken = this.jwtDecodeService.decodeToken(response.body.token);
        console.log('Decoded token:', response);

      }     },
    error: (error) => {
      console.error('Error details:', {
        status: error.status,
        statusText: error.statusText,
        error: error.error,
        body: error.error?.body,
        message: error.message
      });
    }
  });
}
}
