import { Component, OnInit } from '@angular/core';
import 'lodash';
import { CodificacionService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { GastosModel } from '../../interfaces/gastos.interface';
import { GuardarPostulante } from '../../interfaces/guardarpostulante.interface';

import { PostulantesService } from '../../services/postulantes/postulantes.service';
import { Table } from 'primeng/table';
import { now } from 'moment';
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

  postulante: GuardarPostulante = {
    ci: '',
    nombres: '',
    ap_pat: '',
    ap_mat: '',
    celular: '',
    correo: '',
    fecnac: undefined,
    domicilio: '',
    depto: undefined,
    id_escuela: undefined,
    cod_boucher: '',
    fec_boucher: undefined,
    total_boucher: undefined,
    img_boucher: '',
    id_usuario_asig: undefined,
    estado: '',
    usucre: '',
    feccre: undefined,
    usumod: '',
    fecmod: undefined,
  };

  departamentos: any;

  escuelas: any;

  constructor(private postulantesService: PostulantesService) { }

  ngOnInit() {
    this.postulantesService.getPostulantes().subscribe((data: any[]) => {
      this.postulantes = data;
    });
    this.postulantesService.getDepartamentos().subscribe((data: any[]) => {
      this.departamentos = data;
    });
    this.postulantesService.getEscuelas().subscribe((data: any[]) => {
      this.escuelas = data;
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
    this.postulante.img_boucher = 'prueba.jpg';
    this.postulante.id_usuario_asig = Number(localStorage.getItem('id'));
    this.postulante.estado= 'ELABORADO';
    this.postulante.usucre= 'admin';
    this.postulante.feccre= new Date();
    this.postulante.usumod= '';
    this.postulante.fecmod= new Date();
    this.postulantesService.createPostulante(this.postulante).subscribe(
    response => {
      console.log('Postulante guardado:', response);
      Swal.fire({
              title: 'Guardado',
              text: 'El postulante ha sido registrado con exito',
              icon: 'success'
      })
        
    },
    error => {
      console.error('Error al guardar el postulante:', error);
      // Manejar errores
    }
  );
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
