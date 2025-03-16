import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  post(data: any) {
    console.log(data);
  }
  get() {
    return 'get';
  }
  put(data: any) {
    console.log(data);
  }
  delete(id: string) {
    console.log(id);
  }
}
