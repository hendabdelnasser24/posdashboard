import { DecimalPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { InputNumber } from 'primeng/inputnumber';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [NgIf, FormsModule, DecimalPipe, TableModule, InputNumber, ToggleSwitch, InputIcon, IconField, InputTextModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {


  @Input() productList: any[] = [];
  @Output() total: EventEmitter<number> = new EventEmitter<number>();
  @Output() opendButton: EventEmitter<boolean> = new EventEmitter<boolean>;
  @Input() totalOrderOperation!: () => void;
  @Input() refreshList!: () => void;
  isOpen: boolean = false;
  @ViewChild('dt') dt!: Table;


  constructor(private cdr: ChangeDetectorRef) { }

  getRefreshList() {
    if (this.refreshList) {
      this.refreshList()
    }
  }

  getTotalOrder() {
    if (this.totalOrderOperation) {
      this.totalOrderOperation()
    }
  }
  calcSubtotal() {
    const allTotal: number = this.productList.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    this.total.emit(allTotal);
  };

  openToggle() {
    this.isOpen = !this.isOpen;
    this.opendButton.emit(this.isOpen);
  }

  handleSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }


}

