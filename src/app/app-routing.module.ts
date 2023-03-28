import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './component/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { LogoutComponent } from './component/logout/logout.component';
import { CheckLoginGuard } from './guards/check-login.guard';

const routes: Routes = [
  {path:'usuarios', component:UsuariosComponent},
  {path:'categorias', component: CategoriasComponent},
  {path:'login', component:LoginComponent,canActivate:[CheckLoginGuard]},
  {path:'productos', component:ProductosComponent},
  {path:'cerrarSesion', component:LogoutComponent},  
  {path: '', redirectTo: '/categorias', pathMatch: 'full'},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
