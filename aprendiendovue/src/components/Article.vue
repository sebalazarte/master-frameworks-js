<template>
  <div class="general">
    <Slider texto="Blog"></Slider>
    <div class="center">
      <section id="content">
        <article class="article-item article-detail" v-if="article">
          <div class="image-wrap" v-if="article.image">
            <img
              :src="url + 'get-image/' + article.image"
              alt="article.title"
            />
          </div>

          <h1 class="subheader">{{ article.title }}</h1>
          <span class="date"> {{ article.date | moment("from", "now") }} </span>
          <p>
            {{ article.content }}
          </p>
          <div class="clearfix"></div>

          <router-link :to="'/editar/' + article._id" class="btn btn-warning"
            >Editar</router-link
          >
          <a @click="deleteArticle(article._id)" class="btn btn-danger"
            >Eliminar</a
          >
        </article>
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
import Global from "../Global.js";
import swal from "sweetalert";

export default {
  name: "Article",
  components: {
    Slider,
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      article: null,
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.getArticle(id);
  },
  methods: {
    getArticle(articleId) {
      axios.get(this.url + "article/" + articleId).then((res) => {
        if (res.data.status == "success") {
          this.article = res.data.article;
        }
      });
    },
    deleteArticle(articleId) {
      swal({
        title: "Estas seguro?",
        text: "Una vez que sea borrado, no se podrá recuperar",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(this.url + "article/" + articleId).then((res) => {
            this.article = res.data.article;
            swal(
              "Articulo borrado",
              "El articulo ha sido borrado correctamente",
              "success"
            );
            this.$router.push("/blog");
          });
        } else {
          swal("Tranquilo", "El articulo esta seguro", "success");
        }
      });
    },
  },
};
</script>