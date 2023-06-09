import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Title }     from '@angular/platform-browser';
import { IProperty } from 'src/app/interfaces/properties.interface';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: IProperty[] = [];
  title = 'Estoque';

  constructor(
    private titleService: Title
  ) { }

  async getAll(){
    const url = 'http://localhost:8000/property/v1';
    try {
      const response = await axios.get(url);
      this.properties = response.data.properties;
    } catch (error) {
      console.error(error);
    }
    return;
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

  ngOnInit() {
    this.getAll();
    this.titleService.setTitle(this.title);
  }
}
