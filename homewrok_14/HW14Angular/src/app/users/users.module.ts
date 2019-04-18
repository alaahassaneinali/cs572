import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserdetailsComponent } from './userdetails.component';
import { RouterModule } from '@angular/router';
import { UserGuard } from './userguard';
import { UsernotfoundComponent } from './usernotfound.component';

@NgModule({
  declarations: [UsersComponent, UserdetailsComponent, UsernotfoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent },
      { path: ':uuid', component: UserdetailsComponent, canActivate: [UserGuard] },
      { path: 'user/notfound', component: UsernotfoundComponent }
    ])
  ],
  bootstrap: [UsersComponent],
  providers: [UserGuard]
})
export class UsersModule { }
