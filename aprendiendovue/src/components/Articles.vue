<template>
  <section id="component-articulo">
    <div id="article-list" v-if="articles && articles.length > 0">
      <article
        class="article-item"
        v-for="article in articles"
        :key="article._id"
      >
        <div class="image-wrap">
          <img
            :src="url + 'get-image/' + article.image"
            alt="article.title"
            v-if="article.image"
          />
          <img
            src="../assets/images/default.svg"
            alt="article.title"
            v-if="!article.image"
          />
        </div>

        <h2>{{ article.title }}</h2>
        <span class="date"> {{ article.date | moment('from', 'now') }} </span>
        <router-link :to="{name: 'article', params:{ id: article._id}}">Leer mas</router-link>

        <div class="clearfix"></div>
      </article>
    </div>
    <div v-else-if="articles && articles.length == 0">
      no hay articulos para mostrar
    </div>
     <div v-else>
        Cargando ...
      </div>
  </section>
</template>

<script>
import Global from "../Global.js";

export default {
  name: "Articles",
  props: ["articles"],
  data() {
    return {
      url: Global.url,
    };
  },
};
</script>
