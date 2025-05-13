import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { SharedDataService } from '../shared-data.service';
import { RouterLink } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { OverlayModule } from 'primeng/overlay';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DatePipe, Avatar, AvatarGroup, BadgeModule, OverlayBadgeModule, RouterLink, OverlayModule, OverlayModule,
    MenuModule, RippleModule, AvatarModule, NgIf, ButtonModule, Popover, PopoverModule, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {

  items: MenuItem[] | undefined;
  currentDate: Date = new Date();
  @ViewChild('op') op!: Popover;
  @ViewChild('op2') op2!: Popover;
  display = '0';
  firstValue: number | null = null;
  action: string | null = null;
  notifications = [
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' },
  ];


  constructor(public _sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.profileDropDown();
  }

  toggle(event: any) {
    this.op.toggle(event);
    this.op2.hide();
  }
  
  toggle2(event: any) {
    this.op2.toggle(event);
    this.op.hide();
  }

  profileDropDown() {
    this.items = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+O'
          },
          {
            label: 'Messages',
            icon: 'pi pi-inbox',
            badge: '2'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q'
          }
        ]
      },
      {
        separator: true
      }
    ];
  }

  numClick(val: number) {
    if (this.display === '0') {
      this.display = val.toString();
    } else {
      this.display = `${this.display}${val}`;
    }
  }

  oper(action: string) {
    this.firstValue = parseFloat(this.display);
    this.action = action;
    this.display = '0';
  }

  acBtn() {
    this.display = '0';
  }

  calculate() {
    if (this.firstValue === null || this.action === null) {
      return;
    } const b = parseFloat(this.display);

    let result: number;
    switch (this.action) {
      case 'm':
        result = this.firstValue * b;
        break;
      case 'd':
        if (b === 0) {
          this.display = 'Error';
          return;
        }
        result = this.firstValue / b;
        break;
      case 'a':
        result = this.firstValue + b;
        break;
      case 's':
        result = this.firstValue - b;
        break;
      default:
        return;
    }
    this.firstValue = result;
    this.display = result.toString();
  }

}

