import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  articleForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    backgoundColor: new FormControl('', [Validators.required]),
    textColor: new FormControl('', [Validators.required]),
    textFont: new FormControl('', [Validators.required]),
  });
  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // console.log(this.articleForm.value);
    this.articleService.createArticle(this.articleForm.value).subscribe((data) => {
      console.log(data);
      if(data)
        this.router.navigate(['liste-articles'])
    });
  }
}
