import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProduct } from '../models/product';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  product$: Observable<IProduct>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>
        this.productService.getProductById(Number.parseInt(params.get('id')))
      )
    );
  }

  editProduct(product:IProduct):void{
    this.product$.subscribe(product =>{
      console.log('edit clicked');
      this.router.navigate(['products/edit/'+product.id]);
    })
  }

}
