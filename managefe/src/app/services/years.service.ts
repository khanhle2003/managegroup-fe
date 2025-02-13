import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YearService {
  private yearSource = new BehaviorSubject<string>('2012'); // Giá trị mặc định
  currentYear = this.yearSource.asObservable();

  changeYear(year: string) {
    this.yearSource.next(year);
  }
}