import { Component, OnInit } from '@angular/core';
import { Article  } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import { Router } from "@angular/router";
import { Global } from "../../services/global";
import swal from 'sweetalert';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article;
  public status: string;
  public page_title: string;
  public is_edit: boolean;
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
    private _router: Router
  ) { 
    this.article = new Article('','','',null, '');
    this.page_title = 'Crear articulo';
    this.is_edit = false;
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._articleService.create(this.article).subscribe(
      response => {
        this.status = response.status;
        if(response.status == 'success'){
          this.article = response.article;

          swal(
            'Articulo creado',
            'El articulo se ha creado correctamente',
            'success'
          );

          this._router.navigate(['/blog']);

        }
      },
      error => {
        console.log(error);
        this.status = "error";

        swal(
          'Creacion fallida',
          'El articulo no se ha creado correctamente',
          'success'
        );
      }
    );
  }

  imageUpload(data){
    console.log(data.body);
    this.article.image = data.body.image;
  }

}
