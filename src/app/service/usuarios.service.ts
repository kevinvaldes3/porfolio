import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  URL:string = "https://prueba-tecnica-idecide.azurewebsites.net/api";
  constructor(private _httpService: HttpClient) { }


  getUsuarios(): Observable<any> {
    return this._httpService.get(`${this.URL}/usuarios?desde=0&limite=20`);
  }

  postUsuario(usuario: any): Observable<any> {
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   }); 
    return this._httpService.post(`${this.URL}/usuarios`,usuario,{headers:reqHeader});
  }

  putUsuario(id:string ,usuario: object): Observable<any> {
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   }); 
    return this._httpService.put(`${this.URL}/usuarios/`+ id,usuario,{headers:reqHeader});
  }

  deleteUsuario(id: string): Observable<any> {
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   }); 
    return this._httpService.delete(`${this.URL}/usuarios` + id,{headers:reqHeader});
  }
}
