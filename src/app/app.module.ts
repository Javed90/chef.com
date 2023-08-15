import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MasterModule} from './layouts/master/master.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchStringPipe } from './_pipes/search-string.pipe';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    SearchStringPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MasterModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    NgxDatatableModule,
    NgxAutocompleteModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
