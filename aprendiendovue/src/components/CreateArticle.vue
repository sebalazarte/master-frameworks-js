<template src="./CreateArticle.html">
</template>

<script>
import Sidebar from "./Sidebar";
import axios from "axios";
import Global from "../Global.js";
import Article from "../models/Article";
import { required } from "vuelidate/lib/validators";
import swal from 'sweetalert';

export default {
  name: "CreateArticle",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      article: new Article("", "", null, ""),
      submitted: false,
      file: null,
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
  mounted() {},
  methods: {
    save() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }

      axios
        .post(this.url + "/save", this.article)
        .then((res) => {
          if (res.data.status == "success") {
            //subida de archivo

            if (
              this.file != null &&
              this.file != undefined &&
              this.file != ''
            ) {
              console.log(this.file);
              console.log('entro por aqui');
              const formData = new FormData();
              formData.append("file0", this.file, this.file.name);

              axios
                .post(
                  this.url + "upload-image/" + res.data.article._id,
                  formData
                )
                .then((res) => {
                  if (res.data.article) {
                    swal('Articulo creado', 'El articulo se ha creado correctamente', 'success');
                    this.article = res.data.article;
                    this.$router.push("/blog");
                  } else {
                    swal('Error', 'El articulo no se ha creado', 'error');
                  }
                })
                .catch((error) => {
                  swal('Error', 'El articulo no se ha creado', 'error');
                  console.log(error);
                });
            } else {
              swal('Articulo creado', 'El articulo se ha creado correctamente', 'success');
              this.article = res.data.article;
              this.$router.push("/blog");
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