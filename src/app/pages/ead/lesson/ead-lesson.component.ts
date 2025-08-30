import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ead-lesson',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ead-lesson.component.html',
  styleUrl: './ead-lesson.component.scss'
})
export class EadLessonComponent {}
