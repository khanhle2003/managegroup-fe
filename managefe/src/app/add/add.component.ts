import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit{
  httpClient = inject(HttpClient);
  dataAdd: DataAdd = new DataAdd();
  message: string = '';
  private apiUrl = "http://localhost:8080/add"
  constructor(private router : Router){
    
  }

  ngOnInit(): void {
    
  }
  onSubmit(){
    console.log(this.dataAdd);
  }

  saveData(){
    this.addData(this.dataAdd).subscribe(
      (response) => {
        this.message = 'User added successfully!';
        console.log(this.dataAdd);
      },
      (error) => {
        console.error('Error adding user:', error);
        this.message = 'Failed to add user.';
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
  startDate:string="";
  endDate:string="";
}
