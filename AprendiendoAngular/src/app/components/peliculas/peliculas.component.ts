import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public title: string;
  // public peliculas: Array<Pelicula>;
  public peliculas: Pelicula[];
  public favorita: Pelicula;
  public fecha: any;

  constructor(private _peliculaService: PeliculaService) {
    this.title = "Peliculas";
    // this.peliculas = [
    //   {year: 2019, title: 'Spiderman', image: 'https://as.com/meristation/imagenes/2019/10/15/noticias/1571137562_437495_1571137608_noticia_normal.jpg'},
    //   {year: 2018, title: 'Vengadores', image: 'https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVixGzDct56-tsHGWLZwtml5CejHjH2jjmxSag8NKtgyx7MNfqzhcC5192uzJoo-dpVg0SvdMiLqD37Sx4-MPCRgK0od.jpg?r=2a9'},
    //   {year: 2015, title: 'Batman vd Superman', image: 'https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg'},
    //   {year: 2015, title: 'Batman vd Superman', image: 'https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg'}
    // ];

    //creamos el modelo (clase Pelicula)
    this.peliculas = this._peliculaService.getPeliculas();

    this.fecha = new Date(2021,3,26);

  }

  ngOnInit(): void {
    console.log(this._peliculaService.holaMundo());
  }

  ngDoCheck() {

  }

  ngOnDestroy(){

  }

  mostrarFavorita(event){
    console.log(event);
    this.favorita = event.pelicula;
  }


}
