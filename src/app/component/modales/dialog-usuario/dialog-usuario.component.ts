import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.scss']
})
export class DialogUsuarioComponent implements OnInit {
  form: any;
  constructor(public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.formulario();
  }


   /**
  * Creacion de FormGrup del formulario
  */
   formulario() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
    });
  }

  agregarProducto(){     
    if (this.form.status != "INVALID") {
      let dataEnviar = {
        "nombre": this.form.controls['nombre'].value,
        "correo":this.form.controls['correo'].value,
        "password": this.form.controls['password'].value,
        "rol": this.form.controls['rol'].value
      } 
      console.log(dataEnviar);      
      this._usuariosService.postUsuario(dataEnviar).subscribe({
        next:(data)=>{console.log(data,"guadado"),window.location.reload()},
        error:(error)=>{console.log(error)}
      });    
    }else{
      console.log("no es valido");      
    }
  }

}
