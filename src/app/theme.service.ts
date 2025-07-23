import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private isDark = false;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme(); // al iniciar
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  private applyTheme(): void {
    const themeClass = this.isDark ? 'dark-mode' : 'light-mode';
    const removeClass = this.isDark ? 'light-mode' : 'dark-mode';

    this.renderer.removeClass(document.body, removeClass);
    this.renderer.addClass(document.body, themeClass);
  }

  private loadTheme(): void {
    const storedTheme = localStorage.getItem('theme');
    this.isDark = storedTheme === 'dark';
    this.applyTheme();
  }
}
