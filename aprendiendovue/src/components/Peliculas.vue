<template>
  <div class="general">
    <Slider texto="Listado de peliculas"></Slider>
    <div class="center">
      <section id="content">
        <h1 class="subheader">Últimos artículos</h1>

        <div v-if="misDatos">
          La pelicula favorita de <span v-html="misDatos"></span>
          <br/>
          {{this.nombre | mayusculas | concatenaYear('este es el mejor año')}}
        </div>

        <div class="favorita" v-if="favorita">
          <p>{{favorita.title}}</p>
        </div>


        <!--Listado articulos-->
        <div id="articles">
          <div v-for="pelicula in peliculasMayuscula" v-bind:key="pelicula.title">
            <Pelicula
              :pelicula="pelicula"
              @favorita="marcarFavorita"
            ></Pelicula>
          </div>
        </div>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Pelicula from "./Pelicula";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

export default {
  name: "Peliculas",
  components: {
    Pelicula,
    Sidebar,
    Slider,
  },
  methods: {
    marcarFavorita(favorita) {
      this.favorita = favorita;
    },
  },
  computed: {
    peliculasMayuscula(){
      let peliculasMod = Array.from(this.peliculas);
      for (let index = 0; index < this.peliculas.length; index++) {
        peliculasMod[index].title = peliculasMod[index].title.toUpperCase();
      }
      return peliculasMod;
    },
    misDatos(){
      return this.nombre + ' <strong>' + this.apellido + '</strong>';
    },
    
  },
  filters:{
    mayusculas(value){
      return value.toUpperCase();
    },
    concatenaYear(value, message){
      let date = new Date();
      return value + ' ' + date.getFullYear() + ' ' + message;
    }
  },
  data() {
    return {
      nombre: 'Sebastian',
      apellido: 'Lazarte',
      favorita: null,
      peliculas: [
        {
          year: 2019,
          title: "Spiderman",
          image:
            "https://as.com/meristation/imagenes/2019/10/15/noticias/1571137562_437495_1571137608_noticia_normal.jpg",
        },
        {
          year: 2018,
          title: "Vengadores",
          image:
            "https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVixGzDct56-tsHGWLZwtml5CejHjH2jjmxSag8NKtgyx7MNfqzhcC5192uzJoo-dpVg0SvdMiLqD37Sx4-MPCRgK0od.jpg?r=2a9",
        },
        {
          year: 2015,
          title: "Batman vd Superman",
          image:
            "https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg",
        },
      ],
    };
  },
};
</script>

<style>
</style>