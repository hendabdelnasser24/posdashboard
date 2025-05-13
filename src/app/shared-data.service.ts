import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedDataService {

  sideBarState: boolean = false

  updateSidebarState() {
    this.sideBarState = !this.sideBarState
  }
}