import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  URL:string = "https://prueba-tecnica-idecide.azurewebsites.net/api";
  constructor(private _httpService: HttpClient) { }

  getProductos(): Observable<any> {
    return this._httpService.get(`${this.URL}/productos?desde=0&limite=20`);
  }

  postProducto(producto: any): Observable<any> {
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   }); 
   return this._httpService.post(`${this.URL}/productos`,producto,{headers:reqHeader});
  }

  putProducto(producto:object, id :string): Observable<any> {
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   }); 
   return this._httpService.put(`${this.URL}/productos/`+ id,producto,{headers:reqHeader});
  }

  deleteProducto(producto:string): Observable<any> {
    let tokenSesion = localStorage.getItem("Token");     
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-token': `${tokenSesion}`
   });  
   return this._httpService.delete(`${this.URL}/productos/`+producto,{headers:reqHeader});
  }

}
