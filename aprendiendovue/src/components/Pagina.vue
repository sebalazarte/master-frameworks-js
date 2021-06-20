<template>
  <div class="general">
    <Slider
      texto="Pagina de pruebas"
    ></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Pagina de pruebas</h2>
        <p>{{ id_desde_url }}</p>
        <button @click="actualizarNombre()">Actualizar nombre</button>
        <button @click="RedirigirAlBlog()">Redirigir al blog</button>
        <p>{{ nombre }}</p>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Slider from "./Slider";
import Sidebar from "./Sidebar";

export default {
  name: "Pagina",
  components: {
    Sidebar,
    Slider,
  },
  created() {
    console.log("Componente creado");
  },
  mounted() {
    console.log("Componente montado");
    this.id_desde_url = this.$route.params.id;
  },
  updated() {
    console.log("Componente actualizado");
  },
  destroyed() {
    console.log("Componente eliminado");
  },
  data() {
    return {
      id_desde_url: null,
      nombre: "Seba Lazarte",
    };
  },
  methods: {
    actualizarNombre() {
      this.nombre = "ASL Sistemas";
    },
    RedirigirAlBlog() {
      //this.$router.push('/blog');
      this.$router.push({ name: "pagina", params: { id: "algo" } });
    },
  },
};
</script>