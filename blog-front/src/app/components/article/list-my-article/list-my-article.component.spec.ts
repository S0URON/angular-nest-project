import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyArticleComponent } from './list-my-article.component';

describe('ListMyArticleComponent', () => {
  let component: ListMyArticleComponent;
  let fixture: ComponentFixture<ListMyArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMyArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
