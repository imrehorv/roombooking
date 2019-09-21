import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DaysComponent } from './days/days.component';
import { DayComponent } from './day/day.component';
import { UsersComponent } from './users/users.component';
import { MenuComponent } from './menu/menu.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UserComponent } from './user/user.component';
import { RoomComponent } from './room/room.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DaysComponent,
    DayComponent,
    UsersComponent,
    MenuComponent,
    RoomsComponent,
    UserComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
