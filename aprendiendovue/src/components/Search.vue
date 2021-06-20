<template>
  <div class="general">
    <Slider :texto="'Busqueda:' + searchString"></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Articulos encontrados</h2>

        <div id="articles" v-if="articles">
          <Articles
            :articles="articles"
          ></Articles>
        </div>
        <div v-else>
            No hay articulos para mostrar
        </div>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import axios from "axios";
import Global from '../Global.js';
import Articles from './Articles';

export default {
  name: "Search", 
  components: {
    Slider,
    Sidebar,
    Articles
  },
  data() {
    return {
      url: Global.url,
      articles: null,
      searchString: null
    };
  },
  mounted() {
    this.searchString = this.$route.params.searchString;
    this.getArticlesBySearch(this.searchString);
  },
  methods: {
    getArticlesBySearch(searchString) {
      axios.get(this.url+'search/'+searchString).then((res) => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
        }
      });
    },
  },
};
</script>

