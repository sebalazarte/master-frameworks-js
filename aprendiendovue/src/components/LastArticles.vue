<template>
  <div>
    <Slider
      texto="Bienvenido al curso de VUE"
      home="true"
    ></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Últimos artículos</h2>
        <div id="articles" v-if="articles">
          <Articles
            :articles="articles"
          ></Articles>
        </div>
      </section>
    </div>
    <Sidebar></Sidebar>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import axios from "axios";
import Global from '../Global.js';
import Articles from './Articles';

export default {
  name: "LastArticles",
  components: {
    Slider,
    Sidebar,
    Articles
  },
  data() {
    return {
      url: Global.url,
      articles: null,
    };
  },
  mounted() {
    this.getLastArticles();
  },
  methods: {
    getLastArticles() {
      axios.get(this.url+'articles/last').then((res) => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
        }
      });
    },
  },
};
</script>

<style>
</style>