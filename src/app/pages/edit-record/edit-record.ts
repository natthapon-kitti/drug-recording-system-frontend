import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-edit-record',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './edit-record.html',
  styleUrl: './edit-record.css',
  standalone: true,
})

export class EditRecord {
  form: FormGroup
  student_list = studentList
  med_list = medList
  recordId!: number // <-- ตัวเก็บ id จาก route


  constructor(private fb: FormBuilder, private api: Api, private route: ActivatedRoute, private router: Router
  ) {
    this.form = this.fb.group({
      student_id: ['', Validators.required],
      med_id: ['', Validators.required],
      symptoms: ['', Validators.required],
      timestamp: [new Date(), Validators.required],
      record_id: ['']
    });
  }



  ngOnInit(): void {
    this.loadStudents()
    this.loadMeds()

    this.recordId = Number(this.route.snapshot.paramMap.get('id'))
    if (this.recordId) {
      this.loadRecordById(this.recordId)
    }
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

  loadRecordById(id: number) {
    this.api.getRecordById(id).subscribe({
      next: (data) => {
        const editData = data.data[0]
        console.log('Fetched record:', editData);
        this.form.patchValue({
          student_id: editData.student_id,
          med_id: editData.med_id,
          symptoms: editData.symptoms,
          record_id: editData.record_id
        })
      },
      error: (err) => {
        console.error('Error fetching record by ID:', err);
      },
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.api.updateRecord(this.form.value).subscribe({
        next: (res) => {
          alert('บันทึกข้อมูลเรียบร้อยแล้ว ✅')
          this.form.reset()
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.error('Error:', err)
          alert('เกิดข้อผิดพลาดในการบันทึก ❌')
        },
      })
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
  }
}
