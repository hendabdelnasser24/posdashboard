import { CustomersService } from './../customers.service';
import { InvoiceComponent } from './../invoice/invoice.component';
import { ProductsService } from './../products.service';
import { ChangeDetectorRef, Component, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ButtonModule } from 'primeng/button'
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { DecimalPipe, NgFor } from '@angular/common';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumber } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';


@Component({
  selector: 'app-pos-system',
  standalone: true,
  imports: [ButtonModule, FormsModule, NgFor,
    StyleClassModule, InvoiceComponent, ReactiveFormsModule, ConfirmPopupModule, ConfirmPopup, InputGroup,
    InputGroupAddonModule, InputNumber, InputGroupModule, SelectModule, FloatLabel, DecimalPipe],
  providers: [ConfirmationService, MessageService],
  templateUrl: './pos-system.component.html',
  styleUrl: './pos-system.component.css'
})


export class PosSystemComponent implements AfterViewInit {

  @ViewChild(InvoiceComponent) child!: InvoiceComponent
  @Output() invoiceItems: any[] = [];
  opendToggle: boolean = false;
  customers: any[] = [];
  selectedCustomers: any = [];
  productItems: any[] = [];
  filterItems: any[] = [];
  totalValue: number = 0;
  taxValue: number = 0;
  shippingValue: number = 20;
  orderTotal: number = 0;
  promoCode!: number;
  visible: boolean = false;
  checked: boolean = false;
  allitems: number = 0;


  constructor(private _products: ProductsService, public _CustomersService: CustomersService, private confirmationService: ConfirmationService,
    private messageService: MessageService, private cdr: ChangeDetectorRef) { }


  ngOnInit() {
    this.getProduct()
    this.getCustomersData()
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  filteredItem(category: string) {
    this.filterItems = [];
    this.filterItems = this.productItems.filter(item => item.category == category);
  }

  getProduct() {
    this._products.getproducts().then((data) => {
      this.productItems = data;
      this.filteredItem('lunch')
      let invoice = localStorage.getItem('invoice')
      this.invoiceItems = JSON.parse(invoice || '')
      this.totalOrderValue()
    })
  }

  getCustomersData() {
    this._CustomersService.getcustomers().then((data) => {
      this.customers = data || [];
    });
  }

  clearSelected() {
    this.selectedCustomers = [];
  }

  confirm(event: Event, item: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Add product to invoice?',
      accept: () => {
        this.addItemToInvoice(item);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  addItemToInvoice(item: any) {
    item.quantity = 1;
    this.invoiceItems = [...this.invoiceItems, item];
    this.saveInvoiceItems();
    this.cdr.detectChanges();
    this.totalOrderValue();
  }

  saveInvoiceItems() {
    localStorage.setItem('invoice', JSON.stringify(this.invoiceItems));
  }

  removeItemFromCart(id: any) {
    this.invoiceItems = this.invoiceItems.filter(item => item.id !== id);
    this.saveInvoiceItems();
    this.totalOrderValue();
    if (this.invoiceItems.length == 0) {
      this.refreshInvoice()
    }
  }

  totalOrderValue() {
    const allTotal: number = this.invoiceItems.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    this.totalValue = allTotal;
    const totalItems: number = this.invoiceItems.reduce((sum, item) => sum + Number(item.quantity), 0);
    this.allitems = totalItems;
    this.taxValue = Number(this.totalValue) * 0.15;
    this.orderTotal = Number(this.totalValue) + this.taxValue + this.shippingValue;
    this.saveInvoiceItems();
  }

  toggleState(event: any) {
    this.opendToggle = event;
  }

  refreshInvoice() {
    this.invoiceItems = [];
    this.totalOrderValue();
    this.orderTotal = 0;
    localStorage.removeItem('invoice');
  }

}


