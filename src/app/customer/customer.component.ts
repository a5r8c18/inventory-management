import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../customer/customer.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCardModule } from '@angular/material/card';
import { MenusComponent } from '../menus/menus.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    OverlayModule,
    MatCardModule,
    MenusComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [],
  
})
export class CustomerComponent implements OnInit {
    dialogRef!: MatDialogRef<CustomerComponent>;
  customers: any[] = [];
  columns: any[] = [];
  dataSource: any[] = [];

  @ViewChild('customerDialog') customerDialog!: TemplateRef<any>;
  @ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;

  constructor(private customerService: CustomerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.columns = [
      { prop: 'id', name: 'ID' },
      { prop: 'name', name: 'Nombre' },
      { prop: 'address', name: 'Dirección' },
      { prop: 'mobile', name: 'Teléfono' },
      { prop: 'balance', name: 'Balance' },
      { prop: 'Action', name: 'Acciones',cellTemplate: this.actionTemplate }
    ];
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers: any[]) => {
      console.log('Customers:', customers);
      this.customers = customers;
      this.dataSource = customers; // Actualizar dataSource con los datos de customers
    });
  }

  createCustomer(customer: any): void {
    this.customerService.createCustomer(customer).subscribe((newCustomer: any) => {
      this.customers.push(newCustomer);
      this.dataSource = [...this.customers]; // Actualizar dataSource con los datos de customers
    });
  }

  updateCustomer(row: any): void {
    this.customerService.updateCustomer(row).subscribe((updatedCustomer: any) => {
    const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
    if (index !== -1) {
    this.customers[index] = updatedCustomer;
    this.dataSource = [...this.customers]; // Actualizar dataSource con los datos de customers
    }
    });
    }

    deleteCustomer(row: any): void {
      this.customerService.deleteCustomer(row.id).subscribe(() => {
      this.customers = this.customers.filter(c => c.id !== row.id);
      this.dataSource = [...this.customers]; // Actualizar dataSource con los datos de customers
      });
      }

  openCustomerDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(this.customerDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }

  viewCustomer(id:number): void {
    this.customerService.getCustomerById(id).subscribe((customer:any)=> {
      // Mostrar detalles del cliente en un modal
      })
    }
}