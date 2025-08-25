import { Component, ViewEncapsulation, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EadService } from '../../../core/services/ead.service';
import { AulaDTO } from '../../../core/models/ead.model';

@Component({
  selector: 'app-ead-lesson',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: './ead-lesson.component.html',
  styleUrl: './ead-lesson.component.scss'
})
export class EadLessonComponent implements OnInit {
  aula = signal<AulaDTO | null>(null);

  constructor(private route: ActivatedRoute, private ead: EadService) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    const aulaId = Number(this.route.snapshot.paramMap.get('aulaId'));
    this.ead.getLesson(courseId, aulaId).subscribe(a => this.aula.set(a));
  }
}
