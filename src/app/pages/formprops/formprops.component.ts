// formprops.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from 'src/app/services/upload.service';
import axios from 'axios';
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-formprops',
  templateUrl: './formprops.component.html',
  styleUrls: ['./formprops.component.css']
})
export class FormpropsComponent implements OnInit {
  propertyForm!: FormGroup;
  selectedFile: File | null = null;
  title = 'Registrar Imovel';

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private snackBar: MatSnackBar,
    private router: Router,
    private titleService: Title    

  ) {}

  ngOnInit() {
    this.propertyForm = this.fb.group({
      price: [null, Validators.required],
      property_type: [null, Validators.required],
      adress: [null, Validators.required],
      price_buyer: [null, Validators.required],
      size: [null, Validators.required],
      bedrooms: [null, Validators.required],
      description: '',
      price_seller: [0],
      image_url: ['']
    });
    this.titleService.setTitle(this.title);
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  async onSubmit() {
    if (this.propertyForm.valid) {
      if (this.selectedFile) {
        try {
          const imageUrl = await this.uploadService.uploadImage(this.selectedFile);
          const imageUrlControl = this.propertyForm.get('image_url');
          if (imageUrlControl) {
            imageUrlControl.setValue(imageUrl);
          }
          await axios.post('http://localhost:8000/property/create/v1', this.propertyForm.value);
          this.snackBar.open('Property submitted successfully!', 'Close', { duration: 2000 });
          this.router.navigate(['/properties/stock']);
        } catch (err) {
          console.error(err);
          this.snackBar.open('An error occurred while submitting the property', 'Close', { duration: 2000 });
        }
      } else {
        this.snackBar.open('Please select an image', 'Close', { duration: 2000 });
      }
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 2000 });
    }
  }

  
  

}
