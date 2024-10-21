import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from "./pages.routes";
import { TagModule } from 'primeng/tag';

import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdmUsuariosComponent } from "./administrador/adm-usuarios/adm-usuarios.component";
import { CodAsignarComponent } from "./codificacion/cod-asignar/cod-asignar.component";
import { CodSeleccionarComponent } from "./codificacion/cod-seleccionar/cod-seleccionar.component";
import { CodVerificacionComponent } from "./codificacion/cod-verificacion/cod-verificacion.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";

@NgModule({
    declarations: [
    PagesComponent,
    DashboardComponent,
    CodAsignarComponent,
    CodSeleccionarComponent,
    CodVerificacionComponent,
    AdmUsuariosComponent,
    ],
    exports: [
    DashboardComponent,
    CodAsignarComponent,
    CodSeleccionarComponent,
    CodVerificacionComponent,
    AdmUsuariosComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TableModule,
        BrowserAnimationsModule,
        DialogModule,
        KnobModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        TooltipModule,
        AccordionModule,
        RadioButtonModule,
        SelectButtonModule,
        CalendarModule,
        DynamicDialogModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        CheckboxModule,
        NgxDocViewerModule,
        NgxSpinnerModule,
        TagModule
    ]
})

export class PagesModule {
    
}