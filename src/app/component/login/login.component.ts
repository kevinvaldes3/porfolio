import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Login, UserToken } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/service/login.service';
import { Router} from '@angular/router';
import { LoguotService } from 'src/app/service/loguot.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: any;
  constructor( private _loginService:LoginService, private router: Router,private _logout:LoguotService ) { }
  user: any;
  email = new FormControl('', [Validators.required, Validators.email]);
 
  ngOnInit(): void {  
    this.formulario();
  }

  /**
   * Creacion de FormGrup del formulario
   */
  formulario(){
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });    
  }
  /**
   * validador del formulario
   */
  validador(){
    let usaurioEnviar:Login;
    if (this.user.status == "VALID") {
      usaurioEnviar = {
        "correo": this.user.controls['email'].value,
        "password": this.user.controls['password'].value
      }    
       this._loginService.login(usaurioEnviar).subscribe({
        next:(data) =>{this.router.navigate(['/categorias']);},
        error:(e) => console.log(e),        
       });
    }
  }
}
