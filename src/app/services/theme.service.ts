import { Injectable } from '@angular/core';

const THEMES = {
  ligh: 'caramellatte',
  darK: 'sunset'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme: string = THEMES.darK

  constructor() {
    this.currentTheme = localStorage.getItem('theme') || THEMES.darK;
    this.applyTheme(this.currentTheme)
  }

  toggleTheme(): void {

    this.currentTheme = this.currentTheme === THEMES.darK ? THEMES.ligh : THEMES.darK;
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);

  }

  private applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

}
