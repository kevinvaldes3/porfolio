import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriasService } from 'src/app/service/categorias.service';

@Component({
  selector: 'app-dialog-categoria',
  templateUrl: './dialog-categoria.component.html',
  styleUrls: ['./dialog-categoria.component.scss']
})
export class DialogCategoriaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCategoriaComponent>, private _categoriasService:CategoriasService) { }
  form: any;

  ngOnInit(): void {
    this.formulario();
  }

  addCarateristica(){
    const dato = "comida " + this.form.controls['nombre'].value; 
    if (this.form.controls['nombre'].status != "INVALID") {
      dato.toUpperCase()
      let dataEnviar = {
        "nombre":dato
      }        
       this._categoriasService.postCategoria(dataEnviar).subscribe({
         next:(dato)=>{console.log(dato),window.location.reload()},
         error:(error)=>{console.log(error);
         }
       });
      this.dialogRef.close()
    }else{
      console.log("Error Formulario incomlpeto");      
    }
  }

  /**
  * Creacion de FormGrup del formulario
  */
  formulario() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required])
    });
  }
}


