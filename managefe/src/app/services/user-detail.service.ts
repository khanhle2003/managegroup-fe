import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/qldoan';
    private apiUrl2 = 'http://localhost:8080/qldoan/detail';
    private EditUrl = 'http://localhost:8080/api/suadl';
    private EditUrl2 = 'http://localhost:8080/api/doanvao/edit';
    constructor(private http: HttpClient) {}


    getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);

    }
    getUserById2(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl2}/${id}`);

    }
    fetchData(): Observable<any> {
      return this.http.get<any>('http://localhost:8080/qldoan');
  }
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.EditUrl}/${id}`, userData);
  }
  updateUser2(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.EditUrl2}/${id}`, userData);
  }
}
