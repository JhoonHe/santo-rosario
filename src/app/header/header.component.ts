import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ThemeService } from '../theme.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: SharedService, public themeService: ThemeService, public router: Router, public activatedRoute: ActivatedRoute) { }

  today?: any;
  data?: any;
  days?: any;
  current: string = '';

  ngOnInit(): void {

    this.service.data.subscribe(data => {

      this.data = data;

      if (!this.data) return;

      this.current = this.data.days.filter((d: any) => d.code === this.data.code)[0].day;

      this.days = [...this.data.days];
      this.days.sort((a: any, b: any) => {
        if (a.day === 'Domingo') return 1;
        if (b.day === 'Domingo') return -1;
        return 0;
      });

      this.activatedRoute.paramMap.subscribe(params => {

        const param = params.get('day');

        if (param) {
          const param_day = this.data.days.find((d: any) => this.removeAccent(d.day) === param);

          if (param_day) {
            this.today = param_day;
            return;
          }
        }

        this.today = this.data.days.find((d: any) => d.code === this.data.code);
        this.router.navigate(['/', this.removeAccent(this.today.day)]);
      });
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeDay(day: string): void {
    this.today = this.data.days.filter((d: any) => d.code === day)[0];
    this.service.setDay(day);
    this.router.navigate([this.removeAccent(this.today.day)]);
  }

  removeAccent(word: string): string {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
