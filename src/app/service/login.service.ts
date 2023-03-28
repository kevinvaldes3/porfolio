import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Login, UserToken } from '../interfaces/login';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logadoIn = new BehaviorSubject<boolean>(false);
  constructor(private _httpService: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.logadoIn.asObservable();
  }


  login(user: Login): Observable<any> {
    return this._httpService.post("https://prueba-tecnica-idecide.azurewebsites.net/api/auth/login", user).pipe(
      map((res: any) => {
        this.guardarToken(res.token);
        this.guardarUsuario(res.usuario);
        this.logadoIn.next(true);
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Usaurio');
    this.logadoIn.next(false);
    this.router.navigate(['/login']);
  }

  checkToken() {
    const userToken = localStorage.getItem('Token')
    const estaExpirado = HELPER.isTokenExpired(userToken);
    estaExpirado ? this.logout() : this.logadoIn.next(true)
  }

  guardarToken(token: string): void {
    localStorage.setItem('Token', token);
  }

  guardarUsuario(user: object): void {
    localStorage.setItem('Usaurio', JSON.stringify(user))
  }

  validarRolUser() {
    if (this.logadoIn) {     
      let rolDeuser = localStorage.getItem("Usaurio") != null ? localStorage.getItem("Usaurio"):"{correo:'',estado:true, google:false,nombre:'',rol:'',uid:''}";
      let usaurioSesion = JSON.stringify(rolDeuser)  
      let usaurioSesion2 = JSON.parse(usaurioSesion)               
      if (JSON.parse(usaurioSesion2).rol == 'ADMIN_ROLE') {
        return true
      } else {
        return false
      }
    } else {
      console.log("no esta logado");
      return false
    }
  }
}
