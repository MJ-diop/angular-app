import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { DashoardComponent } from './dashoard/dashoard.component';

const routes: Routes = [
  {
    path: '',
    component: DashoardComponent,
    children: [
      { path: 'admin-products', component: AdminProductsComponent },
      // { path: 'admin-orders', component: AdminProductsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
