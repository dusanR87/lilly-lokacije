import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { testService } from 'src/app/services/test.services';

import { Product, ProductMapped } from 'src/app/models/brands-models';
import { switchMap, map, filter } from 'rxjs';


@Component({
  selector: 'app-zadatak2',
  templateUrl: './zadatak2.component.html',
  styleUrls: ['./zadatak2.component.scss']
})
export class Zadatak2Component implements OnInit {
  kesiraniPodaci: any;

  public prozivod1: Observable<Product[]> = of([{id: 1, Name : 'proizvod 1'},{id: 2, Name : 'proizvod 2'},{id: 3, Name : 'proizvod 3'},{id: 4, Name : 'proizvod 4'}])
  public prozivodMapirani1: Observable<ProductMapped[]> = of([]) 
    public map2: Observable<any[]> = of([])
  public prozivodMapirani?: ProductMapped[]

  constructor(private service: testService) { }

  ngOnInit(): void {
  }

  kesiraj() {
    this.onClickClear()
    /*this.service.getAuthToken().subscribe(x=>{
      this.service.getPromotionsWithAuthorization(x['accessToken']).subscribe(x=>{
        console.log('podaci dobijeni rucnim dodavanjem accessToken-a',x)
        this.kesiraniPodaci = x;
      })
    })*/
    this.service.getAuthToken().pipe(
      switchMap((token: any) => {
         return this.service.getPromotionsWithAuthorization(token['accessToken']);
      })
     ).subscribe(x => {
      console.log('podaci dobijeni rucnim dodavanjem accessToken-a',x)
      this.kesiraniPodaci = x
    });
    
  }

  onClickClear() {
    this.kesiraniPodaci = undefined;
    this.prozivodMapirani = undefined;
    this.prozivodMapirani1 = of([])
  }

  mapirajPodatke() {
    this.onClickClear()
    /* this.prozivod1.subscribe((data)=>{
      data.map(y=> {
        this.prozivodMapirani1.subscribe(n=>n.push({id:y['id'],Name:y['Name'],Code:y['id'].toString()}))
      }
      )
    })

    this.prozivodMapirani1.subscribe(x=>{
      console.log('mapirani',x)
      this.prozivodMapirani = x
    }) */
    
    this.prozivodMapirani1 = this.prozivod1.pipe(
      map(x=>x.map(
        ({id,Name})=>({id:id,Name:Name,Code:id.toString()})
      )
    ))
    this.prozivodMapirani1.subscribe(x=>this.prozivodMapirani = x)
  }

}
