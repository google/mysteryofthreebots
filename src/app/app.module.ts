import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InterviewPaneComponent } from './interview-pane/interview-pane.component';
import { ChatComponent } from './chat/chat.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogHostComponent } from './dialog-host/dialog-host.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { HowDialogComponent } from './how-dialog/how-dialog.component';
import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { SolveDialogComponent } from './solve-dialog/solve-dialog.component';
import { RadioListComponent } from './radio-list/radio-list.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';
import { IncorrectSolutionDialogComponent } from './incorrect-solution-dialog/incorrect-solution-dialog.component';
import { IncompleteSolutionDialogComponent } from './incomplete-solution-dialog/incomplete-solution-dialog.component';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InterviewPaneComponent,
    ChatComponent,
    NavButtonsComponent,
    DialogHostComponent,
    HelpDialogComponent,
    HowDialogComponent,
    NotesDialogComponent,
    MapDialogComponent,
    SolveDialogComponent,
    RadioListComponent,
    WinDialogComponent,
    IncorrectSolutionDialogComponent,
    IncompleteSolutionDialogComponent,
    WelcomeDialogComponent,
    DialogCloseButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    HelpDialogComponent,
    HowDialogComponent,
    NotesDialogComponent,
    MapDialogComponent,
    SolveDialogComponent,
    WinDialogComponent,
    IncompleteSolutionDialogComponent,
    IncorrectSolutionDialogComponent,
    WelcomeDialogComponent,
  ],
})
export class AppModule { }
