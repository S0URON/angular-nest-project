import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css'],
})
export class UpdateArticleComponent implements OnInit {
  id: string;
  articleForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    backgoundColor: new FormControl('', [Validators.required]),
    textColor: new FormControl('', [Validators.required]),
    textFont: new FormControl('', [Validators.required]),
  });
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.articleService.getArticleById(this.id).subscribe((data) => {
        console.log(data);
        this.articleForm.setValue({
          title: data.title,
          content: data.content,
          backgoundColor: data.backgoundColor,
          textColor: data.textColor,
          textFont: data.textFont,
        });
      });
    });
  }

  onSubmit(): void {
    console.log(this.articleForm.value);
    this.articleService.updateArticle(this.id ,this.articleForm.value).subscribe((data) => {
      console.log(data);
      if(data)
        this.router.navigate(['mes-articles'])
    });
  }
}
