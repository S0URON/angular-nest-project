import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../articles-types/article.types';
import { Tile } from '../list-article/list-article.component';

@Component({
  selector: 'app-list-my-article',
  templateUrl: './list-my-article.component.html',
  styleUrls: ['./list-my-article.component.css'],
})
export class ListMyArticleComponent implements OnInit {
  listeArticles: Article[] = [];
  tiles: Tile[] = [];

  constructor(private articleService: ArticleService, private route:Router) {}

  ngOnInit(): void {
    const uid = localStorage.getItem("id");
    this.articleService.getMyArticles(uid).subscribe((data) => {
      this.listeArticles = [...data];
      this.tiles = this.listeArticles.map((article, index) => ({
        id: article._id,
        text: article.content,
        color: article.backgoundColor,
        title: article.title,
        createdAt: new Date(article.createdAt).toLocaleDateString(),
        textColor: article.textColor,
        sender: article.sender.username,
        cols: 2,
        rows: 2,
      }));
    });
  }

  deleteArticle(id: string) {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.route.navigate(["liste-articles"])
    })
  }
  editArticle(id: string) {
    const path = `editer-article/${id}`;
    
    this.route.navigate([path])
  }
}
