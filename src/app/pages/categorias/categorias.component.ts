import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { DialogCategoriaComponent } from 'src/app/component/modales/dialog-categoria/dialog-categoria.component';
import { DialogEditarComponent } from 'src/app/component/modales/dialog-editar/dialog-editar.component';
import { DialogEliminarComponent } from 'src/app/component/modales/dialog-eliminar/dialog-eliminar.component';
import { Categorias } from 'src/app/interfaces/categoria';
import { UsaurioSesion } from 'src/app/interfaces/usuario';
import { CategoriasService } from 'src/app/service/categorias.service';
import { LoginService } from 'src/app/service/login.service';
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {   
  currentRoute: string;
  constructor(
    public _login:LoginService ,
    private _categoriasService:CategoriasService,
    public dialog: MatDialog
    ) {}  
    
  categorias:any=[];
  felterCategoria:Observable<any[]>;
  dataParaDialogo:any=[];
  isAdmin:boolean = false;  
  rolUsuario:string | undefined;
  usaurioSesion:UsaurioSesion | undefined;
 
  ngOnInit(): void {    
    this.isAdmin = this._login.validarRolUser();    
    this.traerCategorias();  
  }

  /**
   * hace el llamado a el servicio para traer la data
   */
  traerCategorias(){
    this._categoriasService.getCategoria().subscribe({
      next:(data) =>{
        this.asiganarCategoria(data.categorias)
      },
      error:(error) => {this.errorMensaje("al traer Categorias"),console.log(error)}
    });
  }

  /**
   * asigna la data ya traida
   * @param data 
   */
  asiganarCategoria(data:Categorias){  
     this.categorias =data;
  }    

  /**
   * abre el modal editar
   */
  openDialog(): void {       
    this.dialog.open(DialogCategoriaComponent,{
      width: '600px',
      height:'600px'  
    });
  }

  /**
   * abre modal editar categoria
   * @param _id 
   */
  editarCategoria(_id:string){
    //console.log(_id);
    const dataEditar ={
      id:_id,
      tipo:"categoria"
    }
    this.dialog.open(DialogEditarComponent,{
      width: '600px',
      height:'600px',
      data:dataEditar
    });
    
  }


  /**
   * abre modal eliminar categoria
   * @param _id 
   */
  eliminarCategoria(_id:string){
    //console.log(_id);
    const dataEliminar ={
      id:_id,
      tipo:"categoria"
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
