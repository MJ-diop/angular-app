import { AdminProductDetailComponent } from './pages/admin/admin-products/admin-product-detail/admin-product-detail.component';
import { AdminCustomersComponent } from './pages/admin/admin-customers/admin-customers.component';
import { StoresViewComponent } from './pages/components/stores-view/stores-view.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { UpdateCategoriesComponent } from './pages/categories/update-categories/update-categories.component';
import { ResetPassEmailComponent } from './pages/user/reset-password/reset-pass-email/reset-pass-email.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './pages/stores/list-store/stores.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateStoresComponent } from './pages/stores/create-stores/create-stores.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { AuthGuard } from './guards/connected/auth.guard';
import { NotConnectedGuard } from './guards/not-connected/not-connected.guard';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { ConditionUsedComponent } from './pages/user/condition-used/condition-used.component';
import { SellerOrderComponent } from './pages/order/seller-order/seller-order.component';
import { ProductResultComponent } from './pages/products/product-result/product-result.component';
import { StoreProductsComponent } from './pages/stores/store-products/store-products.component';
import { CategoyDetailComponent } from './pages/category-page/categoy-detail/categoy-detail.component';
import { AboutUsComponent } from './pages/components/about-us/about-us.component';
import { DashoardComponent } from './pages/admin/dashoard/dashoard.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { SingleRegionComponent } from './pages/components/regions/single-region/single-region.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/reset-password',
    component: ResetPassEmailComponent,
  },

  {
    path: 'api/users/password/reset/:uidb64/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'single-region',
    component: SingleRegionComponent,
  },
  // {
  //   path: 'register',
  //   component: RegistrationComponent,
  //   canActivate: [NotConnectedGuard],
  // },
  {
    path: 'email/verify',
    component: RegistrationComponent,
  },
  {
    path: 'update',
    component: UpdateProfileComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashoardComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'addproduct', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'update-product/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },
  { path: 'product-detail/:id/:indexPhoto', component: ProductDetailComponent },
  { path: 'list-store', component: StoresComponent },
  { path: 'all-stores', component: StoresViewComponent },
  { path: 'store-products/:id', component: StoreProductsComponent },
  { path: 'updatestore/:id', component: EditStoresComponent, canActivate: [AuthGuard] },
  { path: 'create-store', component: CreateStoresComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'categories-detail/:id', component: CategoyDetailComponent },
  // { path: 'category', component: CategoryPageComponent },
  { path: 'update-categories/:id', component: UpdateCategoriesComponent },
  { path: 'create-categories', component: CreateCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'orders-seller', component: SellerOrderComponent },
  { path: 'conditions', component: ConditionUsedComponent },
  { path: 'product/:keyword', component: ProductResultComponent },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  // },
  {
    path: 'dashboard',
    component: DashoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-product-detail/:id',
    component: AdminProductDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-customers',
    component: AdminCustomersComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
