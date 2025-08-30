import { AfterViewInit, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../../core/services/sidenav.service';

@Component({
  selector: 'app-ead-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './ead-layout.component.html',
  styleUrl: './ead-layout.component.scss'
})
export class EadLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;
  private sidenav = inject(SidenavService);
  private sub!: Subscription;

  ngAfterViewInit(): void {
    this.sub = this.sidenav.toggle$.subscribe(() => this.drawer.toggle());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
