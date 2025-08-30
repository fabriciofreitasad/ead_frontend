import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private _toggle$ = new Subject<void>();
  toggle$ = this._toggle$.asObservable();

  triggerToggle() {
    this._toggle$.next();
  }
}
