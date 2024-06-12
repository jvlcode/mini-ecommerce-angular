import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product:any = null
  qty:number = 1;


  constructor(
    private route:ActivatedRoute, 
    private apiService:ApiService,
    private cartService: CartService,
    private toastr: ToastrService
  
  )  {

  }
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id:string = data['id'];
      this.apiService.getSingleProduct(id).subscribe((data:any) => {
        this.product = data.product;
      })
    })
  }

  decreaseQty() {
    if(this.qty == 1) 
      return; 
    this.qty = this.qty - 1;
  }
  increaseQty() {
    if (this.qty == this.product.stock) {
        return;
    }
    this.qty = this.qty + 1;
  }

  addToCart() {
    const newCartItem = {
      product: this.product,
      qty: this.qty
    }

    if(this.product.stock == 0) {
      this.toastr.error('Cannot add item due to Out of Stock', 'MiniEcommerce');

      return ;
    }

    // Add cart item
    this.cartService.addItem(newCartItem)
    this.toastr.success('Cart Item Added', 'MiniEcommerce');
  }

}
