import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ead-catalog',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ead-catalog.component.html',
  styleUrl: './ead-catalog.component.scss'
})
export class EadCatalogComponent {}
