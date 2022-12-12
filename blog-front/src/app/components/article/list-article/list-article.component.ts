import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../articles-types/article.types';

export interface Tile {
  id: string;
  color: string;
  cols: number;
  rows: number;
  text: string;
  title: string;
  textColor:string;
  createdAt: string;
  sender: string
}

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css'],
})
export class ListArticleComponent implements OnInit {
  listeArticles: Article[] = [];

  tiles: Tile[] = [];

  constructor(private articleService: ArticleService) {}
  ngOnInit(): void {
    this.articleService.getListArticles().subscribe((data) => {
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

}
