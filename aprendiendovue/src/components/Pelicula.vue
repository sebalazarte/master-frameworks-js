<template>
  <article class="article-item">
        <div class="image-wrap">
          <img
            :src="pelicula.image"
            :alt="pelicula.title"
            :title="pelicula.title"
          />
        </div>

        <h2>{{pelicula.title}}</h2>
        <span class="date" :class="{
          yearGreen: pelicula.year >= 2016,
          yearRed: pelicula.year < 2016
        }"> {{pelicula.year}} </span>
        <a href="#">Leer más</a>
        <button
          @click="pasarFavoritaAlPadre(pelicula)"
        >Marcar como favorita</button>
        <div class="clearfix"></div>
      </article>
</template>

<script>
export default {
    name: 'Pelicula',
    props: ['pelicula'],
    methods: {
      pasarFavoritaAlPadre(pelicula){
        this.$emit('favorita', pelicula);
        }
    },
}
</script>

