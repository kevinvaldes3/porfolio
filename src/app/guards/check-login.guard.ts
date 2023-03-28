import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private _login:LoginService){ }

  canActivate(): Observable<boolean> {
    return this._login.isLogged.pipe(
      take(1),
      map((isLogged:boolean)=> !isLogged)
    )
  }
  
}
