<template>
  <div class="general">
    <Slider texto="Formulario"></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Formulario</h2>

        <form class="mid-form" @submit.prevent="mostrarUsuario()">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" v-model="user.nombre" />
            <!-- agregando el campo submitted a la condicion, no se muestr el mensaje siempre, solo al hacer enviar -->
            <div v-if="submitted && !$v.user.nombre.required">Este campo es requerido</div>
            <div v-if="submitted && !$v.user.nombre.minLength">Este campo debe tener un minumo de 2 caracteres</div>
          </div>

          <div class="form-group">
            <label for="apellidos">Apellidos</label>
            <input type="text" name="apellidos" v-model="user.apellido" />
            <div v-if="submitted && !$v.user.apellido.required">Este campo es requerido</div>
            <div v-if="submitted && !$v.user.apellido.minLength">Este campo debe tener un minumo de 2 caracteres</div>
          </div>

          <div class="form-group">
            <label for="bio">Biografia</label>
            <textarea name="bio" v-model="user.bio"></textarea>
            <div v-if="submitted && !$v.user.bio.required">Este campo es requerido</div>
            <div v-if="submitted && !$v.user.bio.minLength">Este campo debe tener un minumo de 10 caracteres</div>
          </div>

          <div class="form-group radibuttons">
            <input
              type="radio"
              name="genero"
              value="hombre"
              checked
              v-model="user.genero"
            />
            Hombre
            <input
              type="radio"
              name="genero"
              value="mujer"
              v-model="user.genero"
            />
            Mujer
            <input
              type="radio"
              name="genero"
              value="otro"
              v-model="user.genero"
            />
            Otro
          </div>

          <div class="clearfix"></div>

          <input type="submit" value="Enviar" class="btn btn-success" />
        </form>

        <div class="datos" v-if="user.nombre && user.apellido">
          <h3>{{ user.nombre + " " + user.apellido }}</h3>
        </div>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

export default {
  name: "Formulario",
  components: {
    Slider,
    Sidebar,
  },
  validations: {
    user: {
      nombre: {
        required,
        minLength: minLength(2),
      },
      apellido: {
        required,
        minLength: minLength(2),
      },
      bio: {
        required,
        minLength: minLength(10),
      },
    },
  },
  data() {
    return {
      submitted: false,
      user: {
        nombre: "",
        apellido: "",
        bio: "",
        genero: "",
      },
    };
  },
  methods: {
    mostrarUsuario() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      // console.log(this.user);
      alert('validacion pasada');
    },
  },
};
</script>