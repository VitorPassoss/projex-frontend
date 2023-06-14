import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IProperty } from 'src/app/interfaces/properties.interface';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SellPropertyDialogComponent } from 'src/app/components/sell-property-dialog/sell-property-dialog.component';
import { environment } from 'src/app/environment.custom';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: IProperty[] = [];
  title = 'Estoque';

  constructor(
    private titleService: Title,
    private httpClient: HttpClient,
    public dialog: MatDialog,
  ) { }

  async getAll() {
    const url = environment.apiUrl + '/v1/property/';
    try {
      const response = await this.httpClient.get<{ properties: IProperty[] }>(url).toPromise();
      if (response && response.properties) {
        this.properties = response.properties;
      } else {
        console.error('Response or properties is undefined');
      }
    } catch (error) {
      console.error(error);
    }
  }

  getPropertyTypeDescription(propertyType: string): string {
    switch (propertyType) {
      case 'C':
        return 'Casa';
      case 'T':
        return 'Terreno';
      case 'A':
        return 'Apartamento';
      default:
        return 'Outro';
    }
  }

  openSellDialog(property: IProperty): void {
    const dialogRef = this.dialog.open(SellPropertyDialogComponent, {
      data: property,
    });
    
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  

  ngOnInit() {
    this.getAll();
    this.titleService.setTitle(this.title);
  }
}
