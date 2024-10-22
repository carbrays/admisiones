import { RouterModule, Routes } from "@angular/router";
import { loginGuardGuard } from "../services/guards/login-guard.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";

import { AdmUsuariosComponent } from "./administrador/adm-usuarios/adm-usuarios.component";
import { CodAsignarComponent } from "./codificacion/cod-asignar/cod-asignar.component";
import { CodSeleccionarComponent } from "./codificacion/cod-seleccionar/cod-seleccionar.component";
import { CodVerificacionComponent } from "./codificacion/cod-verificacion/cod-verificacion.component";

const pagesRoutes: Routes = [
    {
        path:'', 
        component: PagesComponent,
        canActivate: [loginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },

            /* MEMORANDUM */
            { path: 'cod-asignar', component: CodAsignarComponent, data: { titulo: 'Nuevo Memorandum' }},
            { path: 'cod-seleccionar/:idd/:nit', component: CodSeleccionarComponent, data: { titulo: 'Lista Memorandum' }},
            { path: 'verificacion/:idFuncionario/:idFirma/:idRegistro/:id', component: CodVerificacionComponent, data: { titulo: 'Editar Memorandum' }},
            
            /* ADMINISTRADOR */
            { path: 'usuarios', component: AdmUsuariosComponent, data: { titulo: 'Registro de usuarios' }},
            

            {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);