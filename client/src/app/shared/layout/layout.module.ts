import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const MODULE = [
  FlexLayoutModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  SweetAlert2Module
]

/**
 * @sweetalert2/ngx-sweetalert2
 * https://www.npmjs.com/package/@sweetalert2/ngx-sweetalert2
 * //=> Basic usage (forRoot can also take options, see details below)
 * imports: [SweetAlert2Module.forRoot()],
 *
 * //=> In submodules only:
 * imports: [SweetAlert2Module],
 *
 * //=> In submodules only, overriding options from your root module:
 * imports: [SweetAlert2Module.forChild({ / options / })]
 */


@NgModule({
  imports: [
    SweetAlert2Module.forRoot(),
    CommonModule,
    ...MODULE
  ],
  exports: [
    MODULE
  ],
  declarations: []
})
export class LayoutModule { }
