import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/interfaces/categoria';
import { Producto } from 'src/app/interfaces/producto';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProductosService } from 'src/app/service/productos.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-dialog-eliminar',
  templateUrl: './dialog-eliminar.component.html',
  styleUrls: ['./dialog-eliminar.component.scss']
})
export class DialogEliminarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoriasService: CategoriasService,
    private _productoService: ProductosService,
    private _usuarioServices: UsuariosService) { }

  dataParaModal: any = [];
  categorias: any;
  usuarios: any;
  tipoUsuer: boolean = false;

  ngOnInit(): void {
    this.consultarDato(this.data);
  }


  consultarDato(dataConsulta: any) {
    if (dataConsulta.tipo == "categoria") {
      this.traerCategorias();
    }

    if (dataConsulta.tipo == "producto") {
      this.traerProductos();
    }

    if (dataConsulta.tipo == "usuario") {
      this.tipoUsuer = true;
      this.traerUsuario();
    }
  }

  eliminar(tipo: string, id: string) {
    if (tipo == "categoria") {
      this._categoriasService.deleteCategoria(id).subscribe({
        next: (data) => { console.log("data eliminada"), window.location.reload(); },
        error: (error) => console.log(error)
      });
    }
    if (tipo == "producto") {
      this._productoService.deleteProducto(id).subscribe({
        next: (data) => { console.log("data eliminada"), window.location.reload(); },
        error: (error) => {
          console.log(error);
        }
      });
    }

    if (tipo == "usuario") {
      this._usuarioServices.deleteUsuario(id).subscribe({
        next: (data) => { console.log("data eliminada"), window.location.reload(); },
        error: (error) => {
          console.log(error);
        }
      });

    }

  }

  traerCategorias() {
    this._categoriasService.getCategoria().subscribe({
      next: (data) => { this.asiganarCategoria(data.categorias) },
      error: (error) => console.log(error)
    });
  }

  asiganarCategoria(dataCAtegoria: Categorias) {
    this.categorias = dataCAtegoria;
    this.categorias.map((e: any) => {
      if (this.data.id == e._id) {
        this.dataParaModal = {
          nombre: e.nombre,
          id: e._id,
          tipo: "categoria",
          titulo: "La Categoria"
        };
      }
    })
  }

  traerProductos() {
    this._productoService.getProductos().subscribe({
      next: (data) => { this.asignarProductos(data.productos) },
      error: (error) => { console.log(error) }
    });
  }

  asignarProductos(dataProducto: any) {
    let productos = dataProducto;
    productos.map((e: any) => {
      if (this.data.id == e._id) {
        this.dataParaModal = {
          nombre: e.nombre,
          id: e._id,
          tipo: "producto",
          titulo: "El producto"
        };
      }
    });
  }

  traerUsuario() {
    this._usuarioServices.getUsuarios().subscribe({
      next: (data) => { this.asiganarUsuario(data) },
      error: (error) => console.log(error)
    });
  }

  asiganarUsuario(dataUsuarios: any) {
    this.usuarios = dataUsuarios.usuarios;
    this.usuarios.map((e: any) => {
      if (this.data.id == e.uid) {
        this.dataParaModal = {
          nombre: e.nombre,
          id: e.uid,
          correo: e.correo,
          tipo: "usuario",
          titulo: "El Usuario"
        };
      }
    })
  }

}
