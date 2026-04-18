import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { ThemeService } from '../../../services/theme.service';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  themeService = inject(ThemeService);

  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Registro',
      route: './auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Países',
      route: './country',
    },
  ];
}
