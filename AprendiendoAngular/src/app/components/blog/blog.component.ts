import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Global } from '../../services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  public title : string;
  public articles: Article[];
  public url: string;

  constructor(
    private _articleService: ArticleService
  ) {
    this.title = "Blog";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._articleService.getArticles().subscribe(
      response => {
        if(response.articles){
          this.articles = response.articles;
          console.log(this.articles);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
