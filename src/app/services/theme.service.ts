import { Injectable, signal } from '@angular/core';

const THEMES = {
  ligh: 'caramellatte',
  darK: 'sunset'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme: string = THEMES.darK
  isDark = signal(true);


  constructor() {
    this.currentTheme = localStorage.getItem('theme') || THEMES.darK;
    this.tooglePropertie(this.currentTheme);
    this.applyTheme(this.currentTheme)
  }

  tooglePropertie(theme: string): void {
    const res = (theme === THEMES.darK) ? true : false;
    this.isDark.set(res);
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === THEMES.darK ? THEMES.ligh : THEMES.darK;
    this.tooglePropertie(this.currentTheme);
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  private applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

}
