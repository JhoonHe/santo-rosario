import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private service: SharedService, public title: Title) { }

  ngOnInit(): void {
    // this.service.title.subscribe((t: string) => {
    //   this.title.setTitle(t);
    // });

    // this.service.day.subscribe(day => {
    //   if (!day) return;
    //   this.service.data.subscribe((data: any) => {
    //     this.service.setTitle(data.days.find((d: any) => d.code == day).day);
    //   });
    // });
  }
}
