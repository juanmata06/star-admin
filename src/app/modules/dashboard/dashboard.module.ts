import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { dashboardRoutes } from './dashboard.routing';

import { BalancesListComponent } from './pages/balances-list/balances-list.component';
import { BalanceDetailComponent } from './pages/balance-detail/balance-detail.component';


@NgModule({
  declarations: [
    BalancesListComponent,
    BalanceDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
