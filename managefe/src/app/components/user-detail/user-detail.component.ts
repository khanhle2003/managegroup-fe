import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user-detail.service';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    id: number = 0;
    userData: any;

    constructor(private route: ActivatedRoute, private userService: UserService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getUserData();
        });
    }

    getUserData() {
        this.userService.getUserById(this.id).subscribe(
            data => {
                this.userData = data;
            },
            error => {
                console.error('Error fetching user data:', error);
            }
        );
      }
    }
