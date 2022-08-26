import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
   RouterModule.forChild([
      { path: 'customer', component: CustomerComponent },
    ]),
    SharedModule
  ]
})
export class CustomerModule { }
