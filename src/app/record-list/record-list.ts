import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePencil, lucideTrash2 } from '@ng-icons/lucide'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { Api } from '../services/api';
import { RouterLink, RouterModule } from "@angular/router";

import { Input } from '@angular/core';

interface Record {
  record_id: number
  student_id: number
  med_id: number
  symptoms: string
  timestamp: Date
}

interface Student {
  student_id: number,
  student_name: string
}

interface Medication {
  med_id: number,
  med_name: string
}

const studentList: Student[] = []
const medList: Medication[] = []

@Component({
  standalone: true,
  selector: 'app-record-list',
  imports: [MatTableModule, MatPaginatorModule, NgIcon, RouterLink, RouterModule],
  viewProviders: [provideIcons({ lucidePencil, lucideTrash2 })],
  templateUrl: './record-list.html',
  styleUrl: './record-list.css',
})


export class RecordList implements AfterViewInit {
  displayedColumns: string[] = ['record_id', 'student_id', 'student_name', 'med_name', 'symptoms', 'date', 'tools']
  record_list = new MatTableDataSource<Record>()
  student_list = studentList
  med_list = medList
  page = 0
  limit = 10
  totalRecords = 0
  @Input() searchTerm: string = ''

  constructor(private api: Api) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.record_list.paginator = this.paginator

  }

  ngOnInit(): void {
    this.loadStudents()
    this.loadMeds()
    this.loadRecords()
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement
    this.searchTerm = input.value
    console.log(input.value)

    this.page = 0
    this.record_list.data = []
    this.loadRecords()
  }


  loadStudents() {
    this.api.getStudents().subscribe({
      next: (data) => {
        this.student_list = data
      },
      error: (err) => {
        console.error("Error fetching data students: ", err)
      }
    })
  }

  loadMeds() {
    this.api.getMeds().subscribe({
      next: (data) => {
        this.med_list = data
      },
      error: (err) => {
        console.error("Error fetching data medications: ", err)
      }
    })
  }


  loadRecords() {


    const filterId: number = this.searchTerm && this.searchTerm !== '0'
      ? parseInt(this.searchTerm)
      : 0

    console.log("filterId :", filterId)

    this.api.getRecords(this.page + 1, this.limit, filterId).subscribe({
      next: (data) => {
        this.totalRecords = data.total

        const mappedRecords = data.data.map((record: any) => {
          const student = this.student_list.find((s: any) => s.student_id === record.student_id)
          const med = this.med_list.find((m: any) => m.med_id === record.med_id)
          const date = format(new Date(record.timestamp), 'dd/MM/yyyy HH:mm น.', { locale: th })

          return {
            ...record,
            student_name: student ? student.student_name : 'Unknown',
            med_name: med ? med.med_name : 'Unknown',
            date: date || 'Unknown'
          }
        })

        if (filterId !== null) {
          this.record_list.data = mappedRecords
        } else {
          this.record_list.data = [...this.record_list.data, ...mappedRecords]
        }

        console.log(this.record_list.data)
      },
      error: (err) => {
        console.error('Error fetching data records: ', err)
      }
    })
  }


  deleteRecord(id: number) {


    this.api.deleteRecord(id).subscribe({
      next: (data) => {
        alert('ลบข้อมูลเรียบร้อยแล้ว ✅')
        console.log(data)
        this.record_list = new MatTableDataSource<Record>()
        this.loadRecords()
      },
      error: (err) => {
        console.error('Error fetching data records: ', err)
      }
    })
  }



  onPageChange(event: PageEvent) {

    if (event.pageIndex > this.page) {
      this.page = event.pageIndex
      this.limit = event.pageSize


      this.loadRecords()
    }


  }



}
