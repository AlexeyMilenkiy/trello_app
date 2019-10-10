import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from '@components/pages/start-page/start-page.component';
import { NotFoundPageComponent } from '@components/pages/not-found-page/not-found-page.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { StartHeaderComponent } from '@components/start-header/start-header.component';
import { LogoutPageComponent } from '@components/pages/logout-page/logout-page.component';
import { SharedModule } from '@app/modules/shared.module';
import { BoardsComponent } from '@components/boards/boards.component';
import { AuthInterceptor } from '@app/services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    NotFoundPageComponent,
    MainHeaderComponent,
    StartHeaderComponent,
    LogoutPageComponent,
    BoardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
