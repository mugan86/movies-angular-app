import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IScreen } from '@core/interfaces/screen.interface';
import { ScreenService } from '@core/services/screen.service';
import { SidebarService } from '@core/services/sidebar.service';
import { TranslateService } from '@ngx-translate/core';

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
  screen: { width: number; height: number } = {
    width: 0,
    height: 0,
  };
  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private translate: TranslateService,
    private screenService: ScreenService
  ) {
    this.translate.use('es');

    this.screenService.screen$.subscribe((screen: IScreen) => {
      this.screen = screen;
    });
  }

  ngOnInit(): void {
    this.principalMenu = this.sidebarService.getPrincipalMenuItems();
  }

  trackById = (index: number, menuItem: any): string => menuItem.id;

  navigateTo = (route: string) => {
    this.router.navigate(['/' + route]);
  };
}
