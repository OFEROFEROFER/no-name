import { Routes } from '@angular/router';
import { SearchComponent } from './common/views/search/search.component';
import { InfoComponent } from './common/views/info/info.component';

export const routes: Routes = [
    {path:'',component:SearchComponent},
    {path:'info',//,component:InfoComponent}
    loadComponent: () => import('./common/views/info/info.component').then(m => m.InfoComponent)
    }
];
