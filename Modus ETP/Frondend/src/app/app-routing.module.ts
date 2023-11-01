import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { ListuserComponent } from './components/listuser/listuser.component';
import { EdituserComponent } from './components/edituser/edituser.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "adduser", component: AdduserComponent },
  { path: "listuser", component: ListuserComponent },
  { path: "edituser/:email", component: EdituserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
