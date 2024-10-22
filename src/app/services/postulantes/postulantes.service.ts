import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { GuardarPostulante } from '../../interfaces/guardarpostulante.interface';

@Injectable({
  providedIn: 'root',
})
export class PostulantesService {

  constructor(private http: HttpClient) {}

  getPostulantes(): Observable<any[]> {
    return this.http.get<any[]>(`${URL_SERVICIOS}/dashboard/listar`);
  }

  getDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${URL_SERVICIOS}/dashboard/listarDeptos`);
  }

  getEscuelas(): Observable<any[]> {
    return this.http.get<any[]>(`${URL_SERVICIOS}/dashboard/listarEscuelas`);
  }

  createPostulante(postulante: GuardarPostulante) {
    return this.http.post(`${URL_SERVICIOS}/dashboard/postulante`, postulante);
  }
}
