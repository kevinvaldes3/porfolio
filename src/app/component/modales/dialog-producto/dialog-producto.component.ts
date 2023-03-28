import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.scss']
})
export class DialogProductoComponent {  
  form: any;
  constructor(public dialogRef: MatDialogRef<DialogProductoComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _productosService:ProductosService) {
    //console.log(this.data);    
  }  

  ngOnInit(): void {
    this.formulario();
  }


  /**
  * Creacion de FormGrup del formulario
  */
  formulario() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
    });
  }

  agregarProducto(){   
    if (this.form.status != "INVALID") {
      //console.log("es valido");
      let dataEnviar = {
        "nombre": this.form.controls['nombre'].value,
        "precio":this.form.controls['precio'].value,
        "categoria": this.form.controls['categoria'].value
      }   
      this._productosService.postProducto(dataEnviar).subscribe({
        next:(dato)=>{console.log(dato,"guadado"),window.location.reload()},
        error:(error)=>{console.log(error);
        }
      });    
    }else{
      console.log("no es valido");
      
    }
  }
}
