import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { GuardadminGuard } from './views/guards/admin.guard';
import { GuarduserGuard } from './views/guards/user.guard';



export const routes: Routes = [
    {path:'',component:FrontLayoutComponent,children:[
        {path:'login',loadChildren:()=>import('./views/front/login/login.module').then(m=>m.LoginModule)},
        {path:'register',loadChildren:()=>import('./views/front/register/register.module').then(m=>m.RegisterModule)},

        {path:'verifRegister',loadChildren:()=>import('./views/front/vrif-register/vrif-register.module').then(m=>m.VrifRegisterModule)},
        {path:'forgotPassword',loadChildren:()=>import('./views/front/forgot-password/forgot-password.module').then(m=>m.ForgotPasswordModule)},
        {path:'productDetails',loadChildren:()=>import('./views/front/product-details/product-details.module').then(m=>m.ProductDetailsModule)},
        {path:'allproducts',loadChildren:()=>import('./views/front/allproducts/allproducts.module').then(m=>m.AllproductsModule)},
        {path:'',loadChildren:()=>import('./views/front/landing/landing.module').then(m=>m.LandingModule)},
    ]},
    {path:'user',component:UserLayoutComponent,canActivate:[GuarduserGuard],children:[
        {path:'',loadChildren:()=>import('./views/user/user-information/user-information.module').then(m=>m.UserInformationModule)},
        {path:'addresses',loadChildren:()=>import('./views/user/user-addresses/user-addresses.module').then(m=>m.UserAddressesModule)},
        {path:'informations',loadChildren:()=>import('./views/user/user-information/user-information.module').then(m=>m.UserInformationModule)},
        {path:'wishList',loadChildren:()=>import('./views/user/wishlist/wishlist.module').then(m=>m.WishlistModule)},
        {path:'cart',loadChildren:()=>import('./views/user/cart/cart.module').then(m=>m.CartModule)},
        {path:'commandes',loadChildren:()=>import('./views/user/commande/commande.module').then(m=>m.CommandeModule)}
    ]},
    {path:'admin',component:AdminLayoutComponent,canActivate:[GuardadminGuard],children:[
        {path:'',loadChildren:()=>import('./views/admin/admin-users/admin-users.module').then(m=>m.AdminUsersModule)},
        {path:'users',loadChildren:()=>import('./views/admin/admin-users/admin-users.module').then(m=>m.AdminUsersModule)},
        {path:'marques',loadChildren:()=>import('./views/admin/admin-marques/admin-marques.module').then(m=>m.AdminMarquesModule)},
        {path:'piecetypes',loadChildren:()=>import('./views/admin/piecetype/piecetype.module').then(m=>m.PiecetypeModule)},
        {path:'products',loadChildren:()=>import('./views/admin/products/products.module').then(m=>m.ProductsModule)},
        {path:'addProduct',loadChildren:()=>import('./views/admin/addproduct/addproduct.module').then(m=>m.AddproductModule)},
        {path:'orders',loadChildren:()=>import('./views/admin/orders/orders.module').then(m=>m.OrdersModule)},
    ]},
];
