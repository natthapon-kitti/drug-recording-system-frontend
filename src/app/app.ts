import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { RecordList } from "./record-list/record-list";
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  imports: [RecordList, MatButtonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {





}


