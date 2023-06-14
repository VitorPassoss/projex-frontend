import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { IProperty } from 'src/app/interfaces/properties.interface';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/app/environment.custom';



@Component({
  selector: 'app-sell-property-dialog',
  templateUrl: './sell-property-dialog.component.html',
  styleUrls: ['./sell-property-dialog.component.css']
})
export class SellPropertyDialogComponent implements OnInit {
  sellForm: FormGroup = this.fb.group({ sellingPrice: [''] });  // Inicializando aqui
  
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: IProperty,
    public dialogRef: MatDialogRef<SellPropertyDialogComponent>, 
  ) { }

  ngOnInit(): void {
    this.sellForm = this.fb.group({
      sellingPrice: ['']
    });
  }

  onSubmit(): void {
    this.updateSellingPrice(this.data.pk, this.sellForm.value.sellingPrice)
      .then(() => this.dialogRef.close())  // Adicione esta linha
      .catch(error => console.error(error));
  }


  async updateSellingPrice(pk: number, sellingPrice: number) {
    const url = environment.apiUrl + `/v1/property/`;
    console.log(sellingPrice)
    this.router.navigate(['/dashboard']);
    let response = this.httpClient.post(url, { 
      price_seller: sellingPrice,
      pk: pk
    }).toPromise();

    return response
  }

}

