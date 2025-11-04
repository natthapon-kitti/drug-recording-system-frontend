import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

interface Record {
  record_id: number
  student_id: number
  med_id: number
  symptoms: string
  timestamp: Date
}

const recordList: Record[] = [
  {
    record_id: 1,
    student_id: 1,
    med_id: 1,
    symptoms: "fever",
    timestamp: new Date()
  }
]

@Component({
  selector: 'app-record-list',
  imports: [MatTableModule],
  templateUrl: './record-list.html',
  styleUrl: './record-list.css',
})



export class RecordList {
  displayedColumns: string[] = ['record_id', 'student_id', 'med_id', 'symptoms', 'timestamp']
  record_list = recordList

}
