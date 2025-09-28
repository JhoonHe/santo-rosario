import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private service: SharedService) { }

  data: any;

  mistery?: any;

  prayers?: any;

  today?: any;

  async ngOnInit(): Promise<void> {

    const today = new Date;

    try {
      this.data = await firstValueFrom(this.http.get('assets/Json/content.json'));
      this.today = this.data.days[today.getDay()];
      this.service.setData({ "code": this.today.code, "days": this.data.days });
      this.mistery = this.data.misteries[this.data.days[today.getDay()].mistery];
      this.prayers = this.data['prayers'];

      // this.service.setTitle(this.data.days.find((d: any) => d.code == this.today).day);

      this.service.day.subscribe((day: string) => {
        if (!day) return;
        this.mistery = this.data.misteries[this.data.days.find((d: any) => d.code == day).mistery];
        this.today = this.data.days.filter((d: any) => d.code === day)[0];
      });
    } catch (error) {
      console.error('Error al cargar el JSON:', error);
    }
  }
}
