import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../_guards/auth.guard';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('../../views/home/home.module').then(m => m.HomeModule),
  canActivate:[AuthGuard]
},{
  path: 'orders',
  loadChildren: () => import('../../views/orders/orders.module').then(m => m.OrdersModule),
  canActivate:[AuthGuard]
},{
  path: 'orders/accepted-orders',
  loadChildren: () => import('../../views/accepted-orders/accepted-orders.module').then(m => m.AcceptedOrdersModule),
  canActivate:[AuthGuard]
},{
  path: 'orders/rejected-orders',
  loadChildren: () => import('../../views/rejected-orders/rejected-orders.module').then(m => m.RejectedOrdersModule),
  canActivate:[AuthGuard]
},{
  path: 'recipes',
  loadChildren: () => import('../../views/recipes/recipes.module').then(m => m.RecipesModule),
  canActivate:[AuthGuard]
},{
  path: 'recipes/:id',
  loadChildren: () => import('../../views/single-recipes/single-recipes.module').then(m => m.SingleRecipesModule),
  canActivate:[AuthGuard]
},{
  path: 'login',
  loadChildren: () => import('../../../app/admin/login/login.module').then(m => m.LoginModule)
},{
  path: 'register',
  loadChildren: () => import('../../../app/admin/register/register.module').then(m => m.RegisterModule)
},{
  path: 'otp',
  loadChildren: () => import('../../../app/admin/otp/otp.module').then(m => m.OtpModule)
},{
  path: 'forgot-password',
  loadChildren: () => import('../../../app/admin/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
},{
  path: 'change-password',
  loadChildren: () => import('../../../app/admin/change-password/change-password.module').then(m => m.ChangePasswordModule)
},{
  path: 'products',
  loadChildren: () => import('../../views/products/products.module').then(m => m.ProductsModule),
  canActivate:[AuthGuard]
},{
  path: 'products/:id',
  loadChildren: () => import('../../views/single-product/single-product.module').then(m => m.SingleProductModule),
  canActivate:[AuthGuard]
},{
  path: 'customers',
  loadChildren: () => import('../../views/customers/customers.module').then(m => m.CustomersModule),
  canActivate:[AuthGuard]
},{
  path: 'reviews',
  loadChildren: () => import('../../views/reviews/reviews.module').then(m => m.ReviewsModule),
  canActivate:[AuthGuard]
},{
  path: 'campaign',
  loadChildren: () => import('../../views/campaign/campaign.module').then(m => m.CampaignModule),
  canActivate:[AuthGuard]
},{
  path: 'collections',
  loadChildren: () => import('../../views/collections/collections.module').then(m => m.CollectionsModule),
  canActivate:[AuthGuard]
},{
  path: 'categories',
  loadChildren: () => import('../../views/categories/categories.module').then(m => m.CategoriesModule),
  canActivate:[AuthGuard]
},
{
  path: 'banners',
  loadChildren: () => import('../../views/banners/banners.module').then(m => m.BannersModule),
  canActivate:[AuthGuard]
},
{
  path: 'coupons',
  loadChildren: () => import('../../views/coupons/coupons.module').then(m => m.CouponsModule),
  canActivate:[AuthGuard]
},
{
  path: 'contact',
  loadChildren: () => import('../../views/contact/contact.module').then(m => m.ContactModule),
  canActivate:[AuthGuard]
},
{
  path: 'privacy-policy',
  loadChildren: () => import('../../views/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  canActivate:[AuthGuard]
},
{
  path: 'terms-and-conditions',
  loadChildren: () => import('../../views/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule),
  canActivate:[AuthGuard]
},
{
  path: 'cities',
  loadChildren: () => import('../../views/cities/cities.module').then(m => m.CitiesModule),
  canActivate:[AuthGuard]
},
{
  path: 'countries',
  loadChildren: () => import('../../views/countries/countries.module').then(m => m.CountriesModule),
  canActivate:[AuthGuard]
},
{
  path: 'warehouses',
  loadChildren: () => import('../../views/warehouses/warehouses.module').then(m => m.WarehousesModule),
  canActivate:[AuthGuard]
},
{
  path: 'notifications',
  loadChildren: () => import('../../views/notifications/notifications.module').then(m => m.NotificationsModule),
  canActivate:[AuthGuard]
},
{
  path: 'newsletters',
  loadChildren: () => import('../../views/newsletters/newsletters.module').then(m => m.NewslettersModule),
  canActivate:[AuthGuard]
},
  {
    path: '**',
    loadChildren: () => import('../../views/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
    canActivate:[AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
