import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from 'src/app/services/upload.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-formprops',
  templateUrl: './formprops.component.html',
  styleUrls: ['./formprops.component.css']
})
export class FormpropsComponent implements OnInit {
  propertyForm!: FormGroup;
  selectedFile: File | null = null;
  title = 'Registrar Imovel';
  isLoading = false; 

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private snackBar: MatSnackBar,
    private router: Router,
    private titleService: Title,
    private httpClient: HttpClient  
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
      this.isLoading = true; 
      if (this.selectedFile) {
        try {
          const imageUrl = await this.uploadService.uploadImage(this.selectedFile);
          const imageUrlControl = this.propertyForm.get('image_url');
          if (imageUrlControl) {
            imageUrlControl.setValue(imageUrl);
          }
          await this.httpClient.post('http://localhost:8000/v1/property/create/', this.propertyForm.value).toPromise();
          this.snackBar.open('Property submitted successfully!', 'Close', { duration: 2000 });
          this.router.navigate(['/']);
        } catch (err) {
          console.error(err);
          this.snackBar.open('An error occurred while submitting the property', 'Close', { duration: 2000 });
        } finally {
          this.isLoading = false; 
        }
      } else {
        this.snackBar.open('Please select an image', 'Close', { duration: 2000 });
      }
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 2000 });
    }
  }
}
