import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';
import { SupplierComponent } from './supplier/supplier.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { OrderComponent } from './order/order.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PurchaseModalComponent } from './purchase-modal/purchase-modal.component';
import { SupplierModalComponent } from './supplier-modal/supplier-modal.component';
import { MenusComponent } from './menus/menus.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [

    { path: 'customer', component: CustomerComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'brand', component: BrandComponent },
    { path: 'product', component: ProductComponent },
    { path: 'supplier', component: SupplierComponent },
    { path: 'supplier-modal', component: SupplierModalComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: 'purchase-modal', component: PurchaseModalComponent },
    { path: 'order', component: OrderComponent },
    { path: 'menus', component: MenusComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'home', component:HomeComponent },
    { path: '', redirectTo: '/inventory', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }

];
