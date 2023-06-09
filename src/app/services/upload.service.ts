// upload.service.ts
import { Injectable } from '@angular/core';
import * as filestack from 'filestack-js';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private client: any;

  constructor() {
    this.client = filestack.init('AHCBzhG2HTZejBkImEe43z'); // Substitua 'YOUR_API_KEY' pela sua chave de API
  }

  async uploadImage(image: File): Promise<string> {
    try {
      const response = await this.client.upload(image);
      return response.url;
    } catch (error) {
      console.error('There was an error uploading the image', error);
      return '';
    }
  }
}
