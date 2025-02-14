import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService2 {
    private apiUrl = 'http://localhost:8080/doanvao';
    private EditUrl = 'http://localhost:8080/api/suadl';
    constructor(private http: HttpClient) {}


    getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);

    }
    fetchData(): Observable<any> {
      return this.http.get<any>('http://localhost:8080/doanvao');
  }
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.EditUrl}/${id}`, userData);
  }
}
