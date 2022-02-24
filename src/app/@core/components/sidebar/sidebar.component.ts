import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  principalMenu: Array<{
    url: string;
    label: string;
    icon: string;
  }> = [];
  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit(): void {
    this.principalMenu = this.sidebarService.getPrincipalMenuItems();
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    this.sidebarService.closeMenu();
  }
  trackById = (index: number, menuItem: any): string => menuItem.id;

  navigateTo = (route: string) => {
    this.router.navigate(['/' + route])
    this.closeNav()
  };
}
