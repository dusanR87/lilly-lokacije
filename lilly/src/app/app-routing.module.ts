import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZadatakComponent } from './view/zadatak/zadatak.component';
import { Zadatak2Component } from './view/zadatak2/zadatak2.component';

const routes: Routes = [
  { path: '', component: ZadatakComponent },
  { path: 'zadatak1', component: ZadatakComponent },
  { path: 'zadatak2', component: Zadatak2Component},
  { path: '*', component: ZadatakComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
