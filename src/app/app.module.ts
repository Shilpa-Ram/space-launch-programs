import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LaunchDashboardComponent } from './launch-dashboard/launch-dashboard.component';
import { RequestCreateService } from './services/request-create.service';

@NgModule({
  declarations: [
    AppComponent,
    LaunchDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [RequestCreateService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
