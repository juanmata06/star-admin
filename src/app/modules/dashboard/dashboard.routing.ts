import { Routes } from "@angular/router";

import { BalancesListComponent } from "./pages/balances-list/balances-list.component";
import { BalanceDetailComponent } from "./pages/balance-detail/balance-detail.component";

export const dashboardRoutes: Routes = [
  { path: '', component: BalancesListComponent },
  { path: 'detail', component: BalanceDetailComponent },
  { path: '**', redirectTo: '' },
];