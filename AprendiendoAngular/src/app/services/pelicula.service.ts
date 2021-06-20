import { Injectable  } from "@angular/core";
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService {

  public peliculas: Pelicula[];

  constructor() {
    this.peliculas = [
      new Pelicula('Spiderman', 2019, 'https://as.com/meristation/imagenes/2019/10/15/noticias/1571137562_437495_1571137608_noticia_normal.jpg'),
      new Pelicula('Vengadores', 2018, 'https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVixGzDct56-tsHGWLZwtml5CejHjH2jjmxSag8NKtgyx7MNfqzhcC5192uzJoo-dpVg0SvdMiLqD37Sx4-MPCRgK0od.jpg?r=2a9'),
      new Pelicula('Batman vd Superman', 2015, 'https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg'),
      new Pelicula('Batman vd Superman', 2015, 'https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg')
    ];
  }

  holaMundo(){
    return "Hola Mundo";
  }

  getPeliculas(){
    return this.peliculas;
  }

}
