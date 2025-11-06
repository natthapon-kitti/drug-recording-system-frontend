import { Component, signal } from '@angular/core';
import { RecordList } from "./record-list/record-list";

@Component({
  selector: 'app-root',
  imports: [RecordList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('drug-recording-system');



}


