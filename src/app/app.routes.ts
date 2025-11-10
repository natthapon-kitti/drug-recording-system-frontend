import { Routes } from '@angular/router';
import { RecordList } from './record-list/record-list';
import { AddRecord } from './pages/add-record/add-record';
import { EditRecord } from './pages/edit-record/edit-record';

export const routes: Routes = [
    { path: '', component: RecordList },
    { path: 'add-record', component: AddRecord },
    { path: 'edit-record/:id', component: EditRecord }
];
