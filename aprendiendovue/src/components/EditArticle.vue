<template src="./CreateArticle.html"></template>

<script>
import Sidebar from "./Sidebar";
import axios from "axios";
import Global from "../Global.js";
import Article from "../models/Article";
import { required } from "vuelidate/lib/validators";
import swal from "sweetalert";

export default {
  name: "EditArticle",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      article: new Article("", "", null, ""),
      submitted: false,
      file: null,
      isEdit: true,
    };
  },
  validations: {
    article: {
      title: {
        required,
      },
      content: {
        required,
      },
    },
  },
  mounted() {
    var id = this.$route.params.id;
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
    save() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }

      let articleId = this.$route.params.id;
      axios
        .put(this.url + "/article/" + articleId, this.article)
        .then((res) => {
          if (res.data.status == "success") {
            //subida de archivo

            if (
              this.file != null &&
              this.file != undefined &&
              this.file != ""
            ) {
              console.log(this.file);
              console.log("entro por aqui");
              const formData = new FormData();
              formData.append("file0", this.file, this.file.name);

              axios
                .post(
                  this.url + "upload-image/" + res.data.article._id,
                  formData
                )
                .then((res) => {
                  if (res.data.article) {
                    swal(
                      "Articulo editado",
                      "El articulo se ha editado correctamente",
                      "success"
                    );
                    this.article = res.data.article;
                    this.$router.push("/articulo/" + articleId);
                  } else {
                    swal("Error", "El articulo no se ha editado", "error");
                  }
                })
                .catch((error) => {
                  swal("Error", "El articulo no se ha editado", "error");
                  console.log(error);
                });
            } else {
              swal(
                "Articulo editado",
                "El articulo se ha editado correctamente",
                "success"
              );
              this.article = res.data.article;
              this.$router.push("/articulo/" + articleId);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fileChange() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>