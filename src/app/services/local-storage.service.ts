import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  favoritesSubjects = new BehaviorSubject<any[]>([]);

  constructor() {
    if (localStorage.getItem('saved')) {
      this.favoritesSubjects.next(JSON.parse(localStorage.getItem('saved')!))
    }
  }

  saveUser(user: any): void {
    const actualArray = this.favoritesSubjects.value;
    const newArray = [...actualArray, user];
    this.favoritesSubjects.next(newArray);
    localStorage.setItem('saved', JSON.stringify(newArray));
  }
}
