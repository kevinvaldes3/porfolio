import { Component, OnInit } from '@angular/core';
import { LoguotService } from 'src/app/service/loguot.service';
import { ProductosService } from 'src/app/service/productos.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogProductoComponent } from 'src/app/component/modales/dialog-producto/dialog-producto.component';
import { CategoriasService } from 'src/app/service/categorias.service';
import { UsuarioLoginService } from 'src/app/service/usuarioLogin.service';
import { UsaurioSesion } from 'src/app/interfaces/usuario';
import { DialogEditarComponent } from 'src/app/component/modales/dialog-editar/dialog-editar.component';
import { DialogEliminarComponent } from 'src/app/component/modales/dialog-eliminar/dialog-eliminar.component';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  isAdmin:boolean = false; 
  productos:any=[];
  categorias:any=[];
  dataParaDialogo:any=[];
  rolUsuario:string | undefined;
  usaurioSesion:UsaurioSesion | undefined;
  constructor(
    private _productoService:ProductosService,
    public dialog: MatDialog,
    private _categoriasService:CategoriasService,
    private _login:LoginService) { }

  ngOnInit(): void {
    this.isAdmin = this._login.validarRolUser();
    this.traerProductos();
    this.traerCategorias();
  }

  traerProductos(){
    this._productoService.getProductos().subscribe({
      next:(data) => {this.asignarProductos(data.productos)},
      error:(error) =>{console.log(error),this.errorMensaje("al traer producto")}
    });
  }

  asignarProductos(data:any){
    this.productos=data;  
    
  }

  openDialog(data:any): void {
    //console.log(data);    
    this.dialog.open(DialogProductoComponent, {
      width: '600px',
      height:'600px',
      data:data
    });
  }

  traerCategorias(){
    this._categoriasService.getCategoria().subscribe({
      next:(data) =>{this.dataParaDialog(data.categorias),  this.categorias = data.categorias},
      error:(error) => {console.log(error),this.errorMensaje("al traer Categorias")}    
    });
  }

  dataParaDialog(dataCategoria:any ){  
    //console.log(dataCategoria);     
    this.dataParaDialogo={ 
      categorias:dataCategoria
    }
  }

  editarCategoria(_id:string){
    //console.log(_id);
    const dataEditar ={
      id:_id,
      tipo:"producto"
    }
    this.dialog.open(DialogEditarComponent,{
      width: '600px',
      height:'600px',
      data:dataEditar
    });
    
  }

  eliminarCategoria(_id:string){
    //console.log(_id);
    const dataEliminar ={
      id:_id,
      tipo:"producto"
    }
    this.dialog.open(DialogEliminarComponent,{
      width: '569px',
      height:'400px',
      data:dataEliminar 
    });
  }
  errorMensaje(text:string){
    Swal.fire({
      title:`Error: ${text}`,
      icon:"error",
      showCloseButton:true
    })
  }
}
