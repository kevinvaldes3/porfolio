import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsaurioSesion } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/service/login.service';
import { LoguotService } from 'src/app/service/loguot.service';
import { UsuarioLoginService } from 'src/app/service/usuarioLogin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sesionIniciada = false;
  usaurioSesion:UsaurioSesion | undefined;
  nombreUsuario:string | undefined;
  rolUsuario:string | undefined;
  validarRol:boolean = false; 

  isAdmin:boolean=false;
  constructor(  private _usuarioLoginService:UsuarioLoginService,public _login:LoginService,private router:Router ) { }

  ngOnInit(): void {        
    if (this._login.logadoIn.value) {      
      this.validarSesion(); 
    }   
  }

  ButonCerrarSesion(){
    this._login.logout();   
    //this.router.navigate(['/cerrarSesion']);
  }

   validarSesion(){
    let valorUsuario:any = "{correo:'',estado:true, google:false,nombre:'',rol:'',uid:''}"
    if (localStorage.getItem("Usaurio") == '') {
       localStorage.setItem("Usaurio",valorUsuario);
    }else{
      valorUsuario = localStorage.getItem("Usaurio");
    }
    this.usaurioSesion = JSON.parse(valorUsuario)
    this.nombreUsuario = this.usaurioSesion?.nombre;
    this.rolUsuario = this.usaurioSesion?.rol;
    if (this.rolUsuario == "ADMIN_ROLE" ) {
      this._usuarioLoginService.rolUsuario$.emit(true); 
    }
  }

}
