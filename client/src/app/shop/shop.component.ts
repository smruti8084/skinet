import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/Product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import {ShopParams} from '../shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTearm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price Low to High', value: 'priceAsc'},
    {name: 'Price High to Low', value: 'priceDesc'}
  ];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getBrands();
    this.getTypes();
  }
  getProduct(){
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe( response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe( response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {console.error(error);
    });
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProduct();
  }

  onPageChanged(event: any){
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProduct();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTearm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onReset() {
    this.searchTearm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProduct();
  }
}
