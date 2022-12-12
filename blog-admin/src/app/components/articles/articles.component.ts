import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/types/article-types';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  listeArticles: Article[] = [];
  constructor(private route: Router, private articleService: ArticleService) {}

  ngOnInit(): void {
    if (!(localStorage.getItem('token') && localStorage.getItem('id')))
      this.route.navigate(['login']);
    else {
      this.articleService.getListArticles().subscribe((data) => {
        this.listeArticles = data.map((article) => ({
          ...article,
          createdAt: new Date(article.createdAt).toLocaleDateString(),
        }));
      });
    }
  }

  handleApprove(articleId: string, action: string): void {
    this.articleService.handleArticle(articleId, action).subscribe((data) => {
      this.listeArticles = data.map((article) => ({
        ...article,
        createdAt: new Date(article.createdAt).toLocaleDateString(),
      }));
    })
  }

  logout(): void {
    localStorage.clear();
    this.route.navigate(['/login'])
  }
}
