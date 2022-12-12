import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { loggedInState } from 'src/app/utils/test.observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loggedIn = localStorage.getItem('token') && localStorage.getItem('id') ? true : false;;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: Router
  ) {}

  ngOnInit(): void {
    loggedInState.subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn;
    });
  }

  logout(): void {
    localStorage.clear();
    dispatchEvent(new Event("storage"));
    this.route.navigate(['/liste-articles'])
  }
}
