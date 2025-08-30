import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ead-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ead-dashboard.component.html',
  styleUrl: './ead-dashboard.component.scss'
})
export class EadDashboardComponent {}
