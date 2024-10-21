import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario!: Usuario;

  constructor(public http: HttpClient,private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():number {
    return this.usuario.id_usuario;
  }

   validarToken(): Observable<boolean> {
    return this.http.get(`${ URL_SERVICIOS }/login/renew`, {
      headers: {
        'token': this.token
      }
    }).pipe(
      map((resp: any) => {
        this.usuario = new Usuario(0, 0, resp.login, '', resp.login, resp.rol, 'serie');
        this.guardarLocalStorage(resp.token, resp.menu, resp.login, resp.rol);
        return true;
      }),
      catchError(error => of(false))
    );

  }

   guardarLocalStorage(token: string, menu: any, login: any, rol: any){
    localStorage.setItem('login', login);
    localStorage.setItem('rol', rol);
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  login(usuario: Usuario) {
    return this.http.post(`${ URL_SERVICIOS}/login/signin`, usuario)
    .pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu, resp.login, resp.rol);
      })
    );
  }

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }


  readDepartamentoAsignado(id: number){
    return this.http.get(`${URL_SERVICIOS}/creacion/departamentoAsignado/${id}`);
  }

  readUsuarioBrigada(id: number){
    return this.http.get(`${URL_SERVICIOS}/creacion/usuariosBrigada/${id}`);
  }

  readSeleccion(id:any){
    return this.http.get(`${URL_SERVICIOS}/creacion/seleccionCat/${id}`);
  }

  readDepartamento(){
    return this.http.get(`${URL_SERVICIOS}/creacion/departamento`);
  }

  readUsuariosDep(id: number, ro: number){
    return this.http.get(`${URL_SERVICIOS}/creacion/usuarios/${id}/${ro}`, {
      headers: {
        'token': this.token
      }
    });
  }

  readRolCodificacion(){
    return this.http.get(`${URL_SERVICIOS}/creacion/readRolCodificacion`);
  } 
  
  readRol(){
    return this.http.get(`${URL_SERVICIOS}/creacion/rol`);
  }
  
  updateUsuarios(usuario: Usuario) {
    return this.http.put<Usuario>(`${URL_SERVICIOS}/creacion/usuarios`, usuario);
  }

  createUsuarios(usuario: Usuario) {
    return this.http.post(`${URL_SERVICIOS}/creacion/usuarios`, usuario);
  }

  deleteUsuarios(id: number) {
    return this.http.delete(`${URL_SERVICIOS}/creacion/usuarios/${id}`);
  }

}
