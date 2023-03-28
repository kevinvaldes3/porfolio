import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
// import { environment } from "@angular/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  URL:string = "https://prueba-tecnica-idecide.azurewebsites.net/api";
  constructor(private _httpService: HttpClient) { }

  getCategoria(): Observable<any> {
    return this._httpService.get(`${this.URL}/categorias?desde=0&limite=20`);
  }

  postCategoria(categoria: any): Observable<any> {
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   });  
    return this._httpService.post(`${this.URL}/categorias`,categoria,{headers:reqHeader});
  }

  putCategoria(idcategoria: string, nombreCategoria:object): Observable<any> {
    //console.log(nombreCategoria);    
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   }); 
    return this._httpService.put(`${this.URL}/categorias/`+ idcategoria,nombreCategoria,{headers:reqHeader});
  }

  deleteCategoria(idcategoria: any): Observable<any> {
    // console.log(`${this.URL}categorias` + idcategoria);    
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   });  
    return this._httpService.delete(`${this.URL}/categorias/`+ idcategoria,{headers:reqHeader});
  }
 
}
