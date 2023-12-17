import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private badgeCountSubject = new BehaviorSubject<number>(0);
  badgeCount$: Observable<number> = this.badgeCountSubject.asObservable();

  updateBadgeCount(count: number) {
    this.badgeCountSubject.next(count);
  }
}
