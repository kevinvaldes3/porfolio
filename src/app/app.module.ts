import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { DialogProductoComponent } from './component/modales/dialog-producto/dialog-producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './component/logout/logout.component';
import { FormControlDirective, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';


import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { DialogCategoriaComponent } from './component/modales/dialog-categoria/dialog-categoria.component';
import { DialogEditarComponent } from './component/modales/dialog-editar/dialog-editar.component';
import { DialogEliminarComponent } from './component/modales/dialog-eliminar/dialog-eliminar.component';
import { MatTabsModule } from "@angular/material/tabs";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogUsuarioComponent } from './component/modales/dialog-usuario/dialog-usuario.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    ProductosComponent,
    UsuariosComponent,
    LoginComponent,
    HeaderComponent,
    LogoutComponent,
    DialogProductoComponent,
    DialogCategoriaComponent,
    DialogEditarComponent,
    DialogEliminarComponent,
    DialogUsuarioComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,    
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,    
    MatAutocompleteModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [FormControlDirective, FormGroupDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
