import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/auth/qldoan'; 

    constructor(private http: HttpClient) {}

  
    getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`); 
     
    }
    fetchData(): Observable<any> {
      return this.http.get<any>('http://localhost:8080/qldoan'); 
  }
}
