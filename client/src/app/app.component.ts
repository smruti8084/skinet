import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './Models/Product';
import { IPagination } from './Models/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SkiNet';
  products: IProduct[];

  constructor(private Http: HttpClient){ }

  ngOnInit(): void {
    this.Http.get('https://localhost:5001/api/products?pageSize=50').subscribe((response: IPagination) => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });
  }
}
