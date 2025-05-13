import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {

  constructor(public _sharedDataService: SharedDataService) {}

}
