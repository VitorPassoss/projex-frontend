import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { IDashboardData } from 'src/app/interfaces/dashboard.interface';
import { IProperty } from 'src/app/interfaces/properties.interface';
import { environment } from 'src/app/environment.custom';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  title = 'Dashboard';

  DashboardInfo:IDashboardData | null = null
  properties: IProperty[] = [];


  constructor(
    private titleService: Title,
    private httpClient: HttpClient
  ) { }


  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.getDashboardInfo()
    this.getAll();
  }

  async getAll() {
    const url = environment.apiUrl + '/v1/property/history/';
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


  async getDashboardInfo() {
    const url = environment.apiUrl + '/v1/dashboard/'
    try {
      this.httpClient.get<IDashboardData>(url).subscribe(data => {
        this.DashboardInfo = data
      });
    } catch (err) {
      console.log(err)
    }
  }

  getProfitMargin(property: IProperty): number {
  if (property.price_seller && property.price_seller !== 0) {
    return ((property.price_seller - property.price_buyer) / property.price_seller) * 100;
  } else {
    return 0;
  }
}


}
