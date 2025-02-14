import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService2 } from '../../../services/user-detail.service2';
@Component({
  selector: 'app-user-detail2',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule ],
  templateUrl: './user-detail2.component.html',
  styleUrls: ['./user-detail2.component.css']
})
export class UserDetail2Component implements OnInit {
    id: number = 0;
    userData: any;
    httpClient = inject(HttpClient);
    originalData: any[] = [];
    constructor(private route: ActivatedRoute, private userService: UserService2) {}
    filteredData: any[] = [];
    data: any[] = [];

    currentPage = 1;
    itemsPerPage = 100;
    totalItems = 20000000;
    pageInput = 1;

    searchTerm = '';
    tuNgay = '';
    denNgay = '';
    showCheckbox: boolean = false;
    router = inject(Router);
    isDropdownOpen : boolean = false;
    selectedUserId: number =0;
  headerChecked : boolean = false;

  getUserData() {
    this.userService.getUserById(this.id).subscribe(
        data => {
            this.userData = data;
            console.log(this.userData);
            this.selectedUserId = this.id;
        },
        error => {
            console.error('Error fetching user data:', error);
        }
    );
}
goToEdit() {
  this.router.navigate(['/edit-user-dv', this.selectedUserId]);
  console.log(`/edit-user/${this.selectedUserId}`);

}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getUserData();
        });
        this.fetchData();
    }

    fetchData() {
        this.httpClient.get('http://localhost:8080/doanvao').subscribe((data: any) => {
          this.originalData = data;
          this.filteredData = [...this.originalData];
          this.loadPage(1);

        });
      }

    checkPageCheckboxState() {
        const currentPageItems = this.data.filter(item => item !== null);
        this.headerChecked = currentPageItems.length > 0 &&
                            currentPageItems.every(item => item.selected);
      }


      selectAll(event: any)
      {
        this.headerChecked = event.target.checked;
        this.data.forEach(item => {
          if (item) {
            item.selected = this.headerChecked;
          }
        })
      }
        loadPage(page: number) {
        this.currentPage = page;
        this.pageInput = page;
        const startIndex = (page - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;


        this.filteredData.sort((a: any, b: any) => {
          const parseDate = (date: string | null | undefined) => {
            if (!date) return 0;
            if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
              const [day, month, year] = date.split('/').map(Number);
              return new Date(year, month - 1, day).getTime();
            }
            if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
              return new Date(date).getTime();
            }
            if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
              return new Date(date).getTime();
            }

            return 0;
          };

          const dateA = parseDate(a.notificationDate);
          const dateB = parseDate(b.notificationDate);
          return dateB - dateA;
        });

        this.data = this.filteredData.slice(startIndex, endIndex);
        this.totalItems = this.filteredData.length;
        this.checkPageCheckboxState();
      }

      goToPage() {
        if (this.pageInput > 0 && this.pageInput <= this.getTotalPages()) {
          this.loadPage(this.pageInput);
        } else {
          alert(`Số trang không vượt quá ${this.getTotalPages()}`);
        }
      }

      nextPage() {
        if (this.currentPage < this.getTotalPages()) {
          this.loadPage(this.currentPage + 1);
        }
      }

      prevPage() {
        if (this.currentPage > 1) {
          this.loadPage(this.currentPage - 1);
        }
      }

      getTotalPages(): number {
        return 1;
      }



}
