import { trackBy } from './../@core/helpers/track-by';
import { Component, OnInit } from '@angular/core';
import principalMenu from '@data/menus/principal.json';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  principalMenu: Array<{
    url: string;
    label: string;
    icon: string;
  }> = [];
  constructor() {}

  ngOnInit(): void {
    console.log(principalMenu);
    this.principalMenu = principalMenu;
  }

  trackById = (index: number, menuItem: any): string => menuItem.id;
}
