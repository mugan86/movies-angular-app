import { Injectable } from '@angular/core';
import principalMenu from '@data/menus/principal.json';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  getPrincipalMenuItems = () => principalMenu;
}
