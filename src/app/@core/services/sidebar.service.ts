import { Injectable } from '@angular/core';
import principalMenu from '@data/menus/principal.json';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  getPrincipalMenuItems = () => principalMenu;

  openMenu = () => {
    document.getElementById('mySidenav')!.style.width = '250px';
  };

  closeMenu = () => {
    document.getElementById('mySidenav')!.style.width = '0';
  };
}
