import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Article } from '../types/article-types';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private host = 'http://localhost:8080/article';
  constructor(private httpClient: HttpClient) {}

  getListArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.host + '/requests', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  handleArticle(id: string, action: string): Observable<Article[]> {
    return this.httpClient.patch<Article[]>(`${this.host}/status/${id}`,{
      status: action
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
