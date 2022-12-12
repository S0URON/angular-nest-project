import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../components/article/articles-types/article.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private host = 'http://localhost:8080/article';
  constructor(private httpClient: HttpClient) {}

  getListArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.host);
  }

  getMyArticles(id: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.host + '/myarticles/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  createArticle(body: any): Observable<Article> {
    return this.httpClient.post<Article>(
      this.host,
      {
        sender: localStorage.getItem('id'),
        ...body,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  deleteArticle(id: string): Observable<any> {
    return this.httpClient.delete(`${this.host}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getArticleById(id: string): Observable<any> {
    return this.httpClient.get(`${this.host}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  updateArticle(id: string, body: any): Observable<any> {
    return this.httpClient.patch(`${this.host}/${id}`, {
      body,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
