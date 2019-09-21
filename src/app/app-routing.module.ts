import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysComponent } from './days/days.component';
import { UsersComponent } from './users/users.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UserComponent } from './user/user.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  { path: '', redirectTo: '/bookings', pathMatch: 'full' },
  { path: 'bookings', component: DaysComponent },
  { path: 'users', component: UsersComponent },
  { path: 'userdetail/:id', component: UserComponent },
  { path: 'userdetail', component: UserComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'roomdetail/:id', component: RoomComponent },
  { path: 'roomdetail', component: RoomComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
