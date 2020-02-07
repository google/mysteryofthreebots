import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InterviewPaneComponent } from './interview-pane/interview-pane.component';
import { ChatComponent } from './chat/chat.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogHostComponent } from './dialog-host/dialog-host.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InterviewPaneComponent,
    ChatComponent,
    NavButtonsComponent,
    DialogHostComponent,
    HelpDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
