import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Lokacije } from 'src/app/models/brands-models';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

@Component({
  selector: 'app-lokacije',
  templateUrl: './lokacije.component.html',
  styleUrls: ['./lokacije.component.scss']
})
export class LokacijeComponent implements OnInit, OnChanges {
  
  @Input() LISTA_PODATAKA: Lokacije[] = [];
  treeControl = new NestedTreeControl<any>(node => node.stores);
  dataSource = new MatTreeNestedDataSource<Lokacije>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.LISTA_PODATAKA;
  }

  ngOnChanges() {
    this.dataSource.data = this.LISTA_PODATAKA; 
  }


  hasChild = (_: number, node: Lokacije) => !!node.stores && node.stores.length > 0;

}
