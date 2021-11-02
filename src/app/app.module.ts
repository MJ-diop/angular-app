import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { ReloadRouteComponent } from './components/reload-route/reload-route.component';
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UpdateCategoriesComponent } from './pages/categories/update-categories/update-categories.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { CookieService } from 'ngx-cookie-service';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';
// @NgModule({
//   declarations: [AppComponent, ],

import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './pages/products/products.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { StoresComponent } from './pages/stores/list-store/stores.component';
import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { CreateStoresComponent } from './pages/stores/create-stores/create-stores.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { ResetPassEmailComponent } from './pages/user/reset-password/reset-pass-email/reset-pass-email.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { ArticleCheckoutComponent } from './components/article-checkout/article-checkout.component';
import { StripeModule } from 'stripe-angular';
import { ConditionUsedComponent } from './pages/user/condition-used/condition-used.component';
import { SellerOrderComponent } from './pages/order/seller-order/seller-order.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { ProductResultComponent } from './pages/products/product-result/product-result.component';
import { SearchComponent } from './components/shared/search/search.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { FilterPricePipe } from './pipes/filter-price.pipe';
import { FilterMinMaxPricePipe } from './pipes/filter-min-max-price.pipe';
import { StoreProductsComponent } from './pages/stores/store-products/store-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductComponent } from './components/products/products.component';
import { CategoyDetailComponent } from './pages/category-page/categoy-detail/categoy-detail.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UpdateProductReviewComponent } from './pages/products/product-review/update-product-review/update-product-review.component';
import { ProductReviewComponent } from './pages/products/product-review/product-review.component';
import { StoreReviewComponent } from './pages/stores/store-review/store-review/store-review.component';
import { UpdateStoreReviewComponent } from './pages/stores/store-review/update-store-review/update-store-review.component';
import { BuyerNavbarComponent } from './components/buyer/buyer-navbar/buyer-navbar.component';
import { NavLogoComponent } from './components/nav-logo/nav-logo.component';
import { HeadersComponent } from './components/headers/headers.component';
import { RegionsComponent } from './pages/components/regions/regions.component';
import { BestDealsComponent } from './pages/components/best-deals/best-deals.component';
import { PubSectionComponent } from './pages/components/pub-section/pub-section.component';
import { SignupComponent } from './pages/components/signup/signup.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewStarsComponent } from './components/review-stars/review-stars.component';
import { ReviewItemComponent } from './components/review-item/review-item.component';
import { ReviewsStatsComponent } from './components/reviews-stats/reviews-stats.component';
import { TopCategoriesComponent } from './pages/components/top-categories/top-categories.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { RouteReuseStrategy } from '@angular/router';
import { FloatingShareButtonComponent } from './components/floating-share-button/floating-share-button.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { ShippingAdressComponent } from './components/shipping-adress/shipping-adress.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { StoresViewComponent } from './pages/components/stores-view/stores-view.component';
import { LayoutsComponent } from './pages/components/stores-view/layouts/layouts.component';
import { AboutUsComponent } from './pages/components/about-us/about-us.component';
import { DashoardComponent } from './pages/admin/dashoard/dashoard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { BoxLayoutsComponent } from './pages/admin/box-layouts/box-layouts.component';
import { TableLayoutsComponent } from './pages/admin/table-layouts/table-layouts.component';
import { AdminNavbarComponent } from './pages/admin/components/admin-navbar/admin-navbar.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminModule } from './pages/admin/admin.module';
import { SingleRegionComponent } from './pages/components/regions/single-region/single-region.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BuyerRegisterComponent } from './pages/components/buyer-register/buyer-register.component';
import { AdminCustomersComponent } from './pages/admin/admin-customers/admin-customers.component';
import { AdminProductDetailComponent } from './pages/admin/admin-products/admin-product-detail/admin-product-detail.component';

export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const CLIENT_ID = environment.clientId;

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    UpdateProfileComponent,
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ProductsComponent,
    UpdateProductComponent,
    StoresComponent,
    EditStoresComponent,
    CreateStoresComponent,
    CreateProductComponent,
    CategoriesComponent,
    CreateCategoriesComponent,
    HomeComponent,
    ResetPasswordComponent,
    MenuComponent,
    CheckoutComponent,
    ProductDetailComponent,
    CartComponent,
    ResetPassEmailComponent,
    UpdateCategoriesComponent,
    CategoryPageComponent,
    FooterComponent,
    ProfileComponent,
    OrderListComponent,
    OrderDetailsComponent,
    ConditionUsedComponent,
    SellerOrderComponent,
    SearchBarComponent,
    ProductComponent,
    ProductResultComponent,
    SearchComponent,
    WishlistComponent,
    FilterPricePipe,
    FilterMinMaxPricePipe,
    StoreProductsComponent,
    CategoyDetailComponent,
    LoaderComponent,
    ProductReviewComponent,
    UpdateProductReviewComponent,
    StoreReviewComponent,
    UpdateStoreReviewComponent,
    BuyerNavbarComponent,
    NavLogoComponent,
    HeadersComponent,
    RegionsComponent,
    BestDealsComponent,
    PubSectionComponent,
    SignupComponent,
    ReviewsComponent,
    ReviewStarsComponent,
    ReviewItemComponent,
    ReviewsStatsComponent,
    TopCategoriesComponent,
    BreadcrumbComponent,
    PaginationComponent,
    OrderItemComponent,
    OrderStatusComponent,
    LoadingSpinnerComponent,
    ShippingAdressComponent,
    ArticleCheckoutComponent,
    ShippingComponent,
    BankAccountComponent,
    FloatingShareButtonComponent,
    StoresViewComponent,
    LayoutsComponent,
    AboutUsComponent,
    DashoardComponent,
    SidebarComponent,
    BoxLayoutsComponent,
    TableLayoutsComponent,
    AdminNavbarComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    SingleRegionComponent,
    BuyerRegisterComponent,
    AdminCustomersComponent,
    AdminProductDetailComponent,
  ],

  imports: [
    BrowserModule,
    MatStepperModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    HttpClientModule,
    SharedModule,
    AdminModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    StripeModule.forRoot(
      'pk_test_51HQ3ZXFunRLoLWctiy0l6VVOeflU8ES2IRjTyY7LL9rEpKedBIfOfKB1BSSftQk4Qmke8HdtRcdmje7R2whuWgTz00U7HXpwjn'
    ),
    Ng2SearchPipeModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(CLIENT_ID),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3096271000691862'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    CookieService,
    HttpClientModule,
    {
      provide: RouteReuseStrategy,
      useClass: ReloadRouteComponent,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
