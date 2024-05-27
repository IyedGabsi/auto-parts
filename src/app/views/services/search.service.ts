import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchKeywordSubject = new BehaviorSubject<string>('');

  setSearchKeyword(keyword: string) {
    this.searchKeywordSubject.next(keyword);
  }

  getSearchKeyword() {
    return this.searchKeywordSubject.asObservable();
  }
}
