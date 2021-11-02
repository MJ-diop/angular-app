/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Component } from '@angular/core';
import { RouteReuseStrategy, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-reload-route',
  templateUrl: './reload-route.component.html',
  styleUrls: ['./reload-route.component.css'],
})
export class ReloadRouteComponent extends RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  store(route: ActivatedRouteSnapshot, handle: {}): void {}
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  retrieve(route: ActivatedRouteSnapshot): {} {
    return null;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false; // default is true if configuration of current and future route are the same
  }
}
