import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

export const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "product/:id", component: ProductDetailComponent},
    { path: "cart", component: CartComponent},
    { path: "order/success/:id", component: OrderSuccessComponent},
];
