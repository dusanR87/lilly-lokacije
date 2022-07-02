import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZadatakComponent } from './zadatak/zadatak.component';
import { LokacijeComponent } from './lokacije/lokacije.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { Zadatak2Component } from './zadatak2/zadatak2.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ZadatakComponent,
    LokacijeComponent,
    Zadatak2Component
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    MatTreeModule,
    MatIconModule
  ],
  exports: [
    ZadatakComponent
  ]
})
export class ViewModule { }
