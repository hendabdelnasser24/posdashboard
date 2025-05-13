import { CustomersService } from './../customers.service';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule, NgIf } from '@angular/common';
import { SelectModule } from 'primeng/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [TableModule, Dialog, SelectModule, ToastModule, ToolbarModule, ConfirmDialog,
    InputTextModule, TextareaModule, CommonModule, DropdownModule, InputTextModule,
    FormsModule, IconFieldModule, InputIconModule, ButtonModule, ReactiveFormsModule, FormsModule],
  providers: [MessageService, ConfirmationService, CustomersService, Ripple],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {


  addCustomer: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(15)]),
  });

  visible: boolean = false;

  customerDialog: boolean = false;

  customers: any[] = [];

  customer!: any;

  selectedCustomer!: any | null;

  submitted: boolean = false;

  @ViewChild('dt') dt!: Table;

  customerService: any;



  constructor(
    private customersService: CustomersService, private messageService: MessageService, private confirmationService: ConfirmationService,) { }


  ngOnInit(): void {
    this.getCustomersData();
  }


  showDialog() {
    this.visible = true;
  }

  createId(): any {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  addNewCustomer() {
    this.createId()
    if (this.addCustomer.valid) {
      const customerData = this.addCustomer.value;
      const dynamicId = this.createId();
      customerData.id = dynamicId;
      const docId = dynamicId;
      this.customersService.addcustomer(customerData, docId);
      this.getCustomersData();
      this.addCustomer.reset();
    } else {
      console.log('Add customer faild');
    }
  }

  getCustomersData() {
    this.customersService.getcustomers().then((data) => {
      this.customers = data || [];
    });
  }

  handleSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  editCustomer(customer: any) {
    this.addCustomer.patchValue({
      name: customer.name,
      phone: customer.phone,
      city: customer.city,
      address: customer.address
    });
    this.customer = { ...customer };
    this.customerDialog = true;
  }

  deleteSelectedCustomers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected customers?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          const deleteCustomers = this.selectedCustomer.map((customer: any) =>
            this.customersService.deleteDocument(customer.id)
          );
          await Promise.all(deleteCustomers);

          this.customers = this.customers.filter(val => !this.selectedCustomer.includes(val));
          this.selectedCustomer = null;

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Customers Deleted',
            life: 3000
          });
        } catch (error) {
          console.error('Error deleting customers:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete customers',
            life: 3000
          });
        }
      }
    });
  }

  hideDialog() {
    this.customerDialog = !this.customerDialog;
    this.submitted = !this.submitted;
  }

  deleteCustomer(customer: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + customer.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await this.customersService.deleteDocument(customer.id);
          this.customers = this.customers.filter(val => val.id !== customer.id);
          this.customer = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000
          });
        } catch (error) {
          console.error('Error deleting customer: ', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'There was an issue deleting the customer.',
            life: 3000
          });
        }
      }
    });
  }

  saveCustomer(id: number) {
    this.submitted = true;
    if (this.addCustomer.valid) {
      const updatedCustomer = this.addCustomer.value
      updatedCustomer.name = updatedCustomer.name
        .trim()
      const idCustomer = id
      this.customersService.editProduct(idCustomer, updatedCustomer).then(() => {
        this.getCustomersData();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Customer Updated',
          life: 3000
        });
      })
      this.customers = [...this.customers];
      this.customerDialog = false;
      this.customer = {};
    }
  }

}

