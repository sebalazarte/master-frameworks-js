import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Global } from "../../services/global";
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, gif, jpeg",
    maxSize: "1",
    uploadAPI: {
      url: Global.url + 'upload-image',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.article = new Article('', '', '', null, '');
    this.is_edit = true;
    this.page_title = "Editar articulo";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        this.status = response.status;
        if (response.status == 'success') {
          this.article = response.article;

          swal(
            'Articulo editado',
            'El articulo se ha editado correctamente',
            'success'
          );

          this._router.navigate(['/blog/article', this.article._id]);
        }
      },
      error => {
        console.log(error);
        this.status = "error";
        
        swal(
          'Edicion fallida',
          'El articulo no se ha editado correctamente',
          'success'
        );

      }
    );
  }

  imageUpload(data) {
    console.log(data.body);
    this.article.image = data.body.image;
  }

  getArticle(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article;
            console.log(this.article);
          } else {
            this._router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      )
    });
  }

}
