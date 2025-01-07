import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit{
  httpClient = inject(HttpClient);
  dataAdd: DataAdd = new DataAdd();
  message: string = '';
  private apiUrl = "http://localhost:8080/add"
    private fileApiUrl = "http://localhost:8080/savedata";
  constructor(private router : Router){

  }
  

  saveToNotepad() {
    this.httpClient.post(this.fileApiUrl, this.dataAdd).subscribe({
      next: (response) => {
        console.log('Notepad saved successfully');
        this.message += ' and Notepad file created!';
      },
      error: (error) => {
        console.error('Error saving notepad:', error);
        this.message += ' but failed to create Notepad file.';
      }
    });
  }

  ngOnInit(): void {

  }

  saveData(){
    this.addData(this.dataAdd).subscribe(
      (response) => {
        alert('thêm thành công');
        console.log(this.dataAdd);
      this.saveToNotepad
      },
      (error) => {
        console.error('Error adding user:', error);
        this.message = 'Thêm thất bại';
      }
    );
  }
  goToList(){
    this.router.navigate(['/data-table']);
  }
  addData(dataAdd : DataAdd): Observable<Object>{
      return this.httpClient.post(this.apiUrl, dataAdd);
    }
}

export class ButtonBasicDemo { }
export class DataAdd{
  fullname:string="";
  unit:string="";
  country:string="";
  tripPurpose:string="";
  jobTitle:string="";
  selfFunded:string="";
  sponsor:string="";
  hospital:string=""
  invitationUnit:string="";
  partyMember:string="";
  foreignTripCount:number=0;
  notificationNumber:string="";
  notificationDate:string="";
  startDate:string="";
  endDate:string="";
  phoneNumber : number = 0;
  email : string = "";
  gender : string  = "";

}
