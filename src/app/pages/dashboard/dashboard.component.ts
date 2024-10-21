import { Component, OnInit } from '@angular/core';
import 'lodash';
import { CodificacionService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { GastosModel } from '../../interfaces/gastos.interface';
import { RegistroForm } from '../../interfaces/registro.interface';

import { PostulantesService } from '../../services/postulantes/postulantes.service';
import { Table } from 'primeng/table';
declare var _:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  postulantes: any[] = [];
  selectedPostulantes: any[] = [];

  loading: boolean = true;

  vnuevo: boolean = false;
  vmedico: boolean = false;
  vpsico: boolean = false;
  vodonto: boolean = false;

  filterValue: string = '';

  postulante = {
    id: null,
    ci: null,
    nombres: '',
    apPat: '',
    apMat: '',
    celular: '',
    fecnac: null,
    depto: null,
    domicilio: '',
    escuela: null,
    cod_boucher: null,
    fec_boucher: null,
    total_boucher: null
  };

  departamentos: any;

  constructor(private postulantesService: PostulantesService) { }

  ngOnInit() {
    this.postulantesService.getPostulantes().subscribe((data: any[]) => {
      this.postulantes = data;
    });
    this.postulantesService.getDepartamentos().subscribe((data: any[]) => {
      this.departamentos = data;
    });
    this.loading = false;
    
  }
  
  clear(table: any) {
    table.clear();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'APROBADO':
        return 'success';
      case 'PENDIENTE':
        return 'warning';
      case 'RECHAZADO':
        return 'danger';
      default:
        return null;
    }
  }

  evaluar(i: number) {
    if (i == 0) {
      this.vnuevo = true;
    }
    if (i == 1) {
      this.vmedico = true;
    }
    if (i == 2) {
      this.vpsico = true;
    }
    if (i == 3) {
      this.vodonto = true;
    }
  }

  guardarPostulante() {
    // lógica para guardar el postulante
    console.log('Postulante guardado:', this.postulante);
    this.vnuevo = false;
  }

  cancelar(i: number) {
    if (i == 0) {
      this.vnuevo = false;
    }
    if (i == 1) {
      this.vmedico = false;
    }
    if (i == 2) {
      this.vpsico = false;
    }
    if (i == 3) {
      this.vodonto = false;
    }
  }

}
