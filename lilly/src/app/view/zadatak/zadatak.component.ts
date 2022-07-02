import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { testService } from 'src/app/services/test.services';
import { Product, ProductMapped, Lokacije } from 'src/app/models/brands-models';


@Component({
  selector: 'app-zadatak',
  templateUrl: './zadatak.component.html',
  styleUrls: ['./zadatak.component.scss', '../../app.component.scss']
})
export class ZadatakComponent implements OnInit {



  public prozivod1: Observable<Product[]> = of([{id: 1, Name : 'proizvod 1'},{id: 2, Name : 'proizvod 2'},{id: 3, Name : 'proizvod 3'},{id: 4, Name : 'proizvod 4'}])
  public prozivodMapirani1: Observable<ProductMapped[]> = of([]) 


  public lokacije: Lokacije[] = []

  constructor(private service: testService) { 
  }

  ngOnInit(): void {
    this.service.getPromotions().subscribe(x=>{
      this.lokacije = x.data;
    })
      
  }

 

}
