import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categorias } from 'src/app/interfaces/categoria';
import { Usuario } from 'src/app/interfaces/usuario';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProductosService } from 'src/app/service/productos.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-dialog-editar',
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.scss']
})
export class DialogEditarComponent implements OnInit {
  dataParaModal: any = [];
  dataCategorias: any[] = [];
  categorias: any;
  productos: any;
  usuarios: any;
  form: any;
  selected = '';
  selectedEstado = '';
  tipoC: boolean = false;
  tipoUsuer: boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoriasService: CategoriasService,
    private _productoService: ProductosService,
    private _usuarioServices: UsuariosService) { }

  ngOnInit(): void {    
    this.consultarDato(this.data); 
  }
  

  consultarDato(dataConsulta: any) {
    if (dataConsulta.tipo == "categoria") {
      this.formularioCategorias();
      this.traerCategorias("categoria");
    }
    if (dataConsulta.tipo == "producto") {
      this.tipoC = true;
      this.formularioProductos();
      this.traerProductos();
      this.traerCategorias("producto");
    }
    if (dataConsulta.tipo == "usurio") {
      this.formularioUsuario();
      this.tipoUsuer = true;
      this.traerUsuario();
    }

  }

  /**
  * Creacion de FormGrup del formulario
  */
  formularioCategorias() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl(''),
      categoria: new FormControl(''),
      rol: new FormControl(''),
      estado: new FormControl(''),
      correo: new FormControl(''),
    });
  }

  /**
  * Creacion de FormGrup del formulario
  */
  formularioProductos() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      rol: new FormControl(''),
      estado: new FormControl(''),
      correo: new FormControl(''),
    });
  }

   /**
  * Creacion de FormGrup del formulario 
  */
  formularioUsuario() {
    this.form = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      precio: new FormControl(''),
      categoria: new FormControl(''),
      rol: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
    });
  }

  editar(tipo: string, id: string) {
    if (tipo == "categoria") {
      if (this.form.controls['nombre'].value != '') {
        const nombre = this.form.controls['nombre'].value
        const nombreCambio = { nombre: nombre.toUpperCase() }
        this._categoriasService.putCategoria(id, nombreCambio).subscribe({
          next: (data) => { this.dialogRef.close(), window.location.reload() },
          error: (error) => console.log(error)
        });
      }
    }

    if (tipo == "producto") {
      if (this.form.status != 'INVALID') {
        const dataEditar = {
          nombre: this.form.controls['nombre'].value,
          precio: this.form.controls['precio'].value,
          categoria: this.form.controls['categoria'].value
        }
        this._productoService.putProducto(dataEditar, id).subscribe({
          next: (data) => { console.log(data), this.dialogRef.close(), window.location.reload() },
          error: (error) => { console.log(error) }
        });
      } else {
        console.log("no ha llenado nada");
      }
    }

    if (tipo == "usuario") {
      if (this.form.status != 'INVALID') {
        const dataEditar = {
          nombre: this.form.controls['nombre'].value,
          estado: this.form.controls['estado'].value,
          rol: this.form.controls['rol'].value,
          correo: this.form.controls['correo'].value         
        }
        this._usuarioServices.putUsuario(id,dataEditar).subscribe({
          next: (data) => { console.log(data),this.dialogRef.close(), window.location.reload()},
          error: (error) => { console.log(error) }
        });        
      } else {
        console.log("no ha llenado nada");
      }
    }

  }

  traerCategorias(tipo: string) {
    this._categoriasService.getCategoria().subscribe({
      next: (data) => {
        if (tipo = "categoria") {
          this.asiganarCategoria(data.categorias);
        }
        if (tipo = "producto") {
          this.dataCategorias = data.categorias;
        }
      },
      error: (error) => console.log(error)
    });
  }

  asiganarCategoria(dataCategoria: Categorias) {
    this.categorias = dataCategoria;
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
    this.productos = dataProducto;
    this.productos.map((e: any) => {
      if (this.data.id == e._id) {
        this.dataParaModal = {
          nombre: e.nombre,
          id: e._id,
          tipo: "producto",
          precio: e.precio,
          titulo: "El producto"
        };
        this.selected = e.categoria._id;
      }
    })
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
          tipo: "usuario",
          titulo: "El Usuario",
          estado: e.estado,
          rol: e.rol,
          correo: e.correo
        };
      }
      this.selectedEstado = `${e.estado}`;
    })
  }
}
