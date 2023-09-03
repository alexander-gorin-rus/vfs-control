import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  showLinks = false;

  toggleLinks() {
    this.showLinks = !this.showLinks;
  }
  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.removeToken();
    this.authService.setRole('');
    this.router.navigate(['/']);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
