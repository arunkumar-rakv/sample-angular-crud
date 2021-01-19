import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { CanDeactivateGuard } from "./guards/can-deactivate.guard";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-form', component: UserFormComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'user-form/:id', component: UserFormComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'user-detail/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
