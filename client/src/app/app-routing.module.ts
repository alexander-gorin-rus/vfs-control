import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { OperatorComponent } from './components/operator/operator.component';
import { MasterComponent } from './components/master/master.component';
import { FuelAttendantComponent } from './components/fuel-attendant/fuel-attendant.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DirectorComponent } from './components/director/director.component';
import { ROUTE_PATHS } from './shared/paths';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ROUTE_PATHS.Register, component: RegisterComponent},
  {path: ROUTE_PATHS.Login, component: LoginComponent},
  {path: ROUTE_PATHS.Workers, component: WorkersListComponent},
  {path: ROUTE_PATHS.Operator, component: OperatorComponent},
  {path: ROUTE_PATHS.Master, component: MasterComponent},
  {path: ROUTE_PATHS.Fueler, component: FuelAttendantComponent},
  {path: ROUTE_PATHS.Director, component: DirectorComponent},
  {path: ROUTE_PATHS.Forbiddeb, component: ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
