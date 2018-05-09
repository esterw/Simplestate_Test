import { HomeComponent } from "./home/home.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./share/auth.gaurd";


const appRoutes:Routes = [

    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: HomeComponent },
    { path: 'page/dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouting {}
