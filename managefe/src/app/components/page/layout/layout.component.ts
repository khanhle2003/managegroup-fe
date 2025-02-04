import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [SidebarModule, RouterModule,ButtonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isCollapsed = false;
  sidebarVisible: boolean = false;
}
