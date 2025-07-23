import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  data = new BehaviorSubject<string>('');
  day = new BehaviorSubject<string>('');

  setData(data?: any): void {
    this.data.next(data || {});
  }

  setDay(day?: string): void {
    this.day.next(day || '');
  }
}
