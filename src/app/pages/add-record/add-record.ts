import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { Api } from '../../services/api';

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
  selector: 'app-add-record',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,],
  templateUrl: './add-record.html',
  styleUrl: './add-record.css',
  standalone: true,
})

export class AddRecord {

  form: FormGroup
  student_list = studentList
  med_list = medList

  constructor(private fb: FormBuilder, private api: Api) {
    this.form = this.fb.group({
      student_id: ['', Validators.required],
      med_id: ['', Validators.required],
      symptoms: ['', Validators.required],
      timestamp: [new Date(), Validators.required],
    });
  }



  ngOnInit(): void {
    this.loadStudents()
    this.loadMeds()
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

  onSubmit() {
    if (this.form.valid) {
      this.api.addRecord(this.form.value).subscribe({
        next: (res) => {
          alert('บันทึกข้อมูลเรียบร้อยแล้ว ✅');
          this.form.reset();
        },
        error: (err) => {
          console.error('Error:', err);
          alert('เกิดข้อผิดพลาดในการบันทึก ❌');
        },
      });
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }
}
