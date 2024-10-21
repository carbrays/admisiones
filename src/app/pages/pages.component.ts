import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';


declare function init_plugins():any; //para llamar funciones externas
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  constructor(private sidebarService: SidebarService){}

  ngOnInit(): void {
   init_plugins(); 
   this.sidebarService.cargarMenu();
  }
}
