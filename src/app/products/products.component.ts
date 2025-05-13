import { ProductsService } from './../products.service';
import { Productrules } from './../productrules.interface';
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
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableModule, Dialog, SelectModule, ToastModule, ToolbarModule, ConfirmDialog,
    InputTextModule, TextareaModule, CommonModule, DropdownModule, RadioButton, InputTextModule,
    FormsModule, InputNumber, IconFieldModule, InputIconModule, ButtonModule, ReactiveFormsModule, FormsModule],
  providers: [MessageService, ConfirmationService, ProductsService, Ripple],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {


  addItem: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required]),
    category: new FormControl('', [Validators.required, Validators.minLength(2)]),
    cook_time: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('', [Validators.required]),
  });

  visible: boolean = false;

  productDialog: boolean = false;

  products: any[] = [];

  product!: any;

  selectedProducts!: Productrules[] | null;

  submitted: boolean = false;

  @ViewChild('dt') dt!: Table;



  constructor(
    private productService: ProductsService, private messageService: MessageService, private confirmationService: ConfirmationService,) { }


  ngOnInit(): void {
    this.getProductsData();
  }

  showDialog() {
    this.addItem.reset();
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

  addNewProduct() {
    this.createId();
    if (this.addItem.valid) {
      const productData = this.addItem.value;
      productData.category = productData.category
        .trim()
        .toLowerCase();
      const dynamicId = this.createId();
      productData.id = dynamicId;
      const docId = dynamicId;
      this.productService.addProduct(productData, docId);
      this.getProductsData();
      this.addItem.reset();
    } else {
      console.log('add product faild');
    }
  }

  getProductsData() {
    this.productService.getproducts().then((data) => {
      this.products = data || [];
    });
  }

  handleSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  editProduct(product: Productrules) {
    this.addItem.patchValue({
      name: product.name,
      price: product.price,
      category: product.category,
      cook_time: product.cook_time,
      image: product.image,
    });
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.productDialog = !this.productDialog;
    this.submitted = !this.submitted;
  }

  deleteProduct(product: Productrules) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await this.productService.deleteDocument(product.id);
          this.products = this.products.filter(val => val.id !== product.id);
          this.product = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000
          });
        } catch (error) {
          console.error('Error deleting product: ', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'There was an issue deleting the product.',
            life: 3000
          });
        }
      }
    });
  }

  saveProduct(id: number) {
    this.submitted = true;
    if (this.addItem.valid) {
      const updatedProduct = this.addItem.value
      updatedProduct.name = updatedProduct.name
        .trim()
      const idProduct = id
      console.log(updatedProduct)
      this.productService.editProduct(idProduct, updatedProduct).then(() => {
        this.getProductsData();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000
        });
      })
      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

}
