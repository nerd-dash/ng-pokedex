import { Component, OnInit } from '@angular/core';
import { AUTH_ROUTES, POKEGAME_ROUTES } from 'src/app/models/RoutesMap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public POKEGAME_ROUTES = POKEGAME_ROUTES;
  public AUTH_ROUTES = AUTH_ROUTES;

  constructor() {}

  ngOnInit(): void {}
}
