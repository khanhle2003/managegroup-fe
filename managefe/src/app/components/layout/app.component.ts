import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule], 
})
export class AppComponent {
  showSidebar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      // Kiểm tra URL hiện tại
      const currentUrl = this.router.url;
      this.showSidebar = !(currentUrl === '/login' || currentUrl === '/register');
    });
  }

  title = 'managefe';
}
