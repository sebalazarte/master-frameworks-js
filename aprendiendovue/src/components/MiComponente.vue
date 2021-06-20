<template>
  <div>
    <Slider></Slider>
    <div class="center">
      <section id="content">
        <h1>Este es mi componente</h1>
        <h2>{{ subtitulo }}</h2>

        <h2>Reactividad</h2>
        <input type="text" v-model="nombre" />
        Mi nombre es : <strong>{{ nombre }}</strong>
        <pre>{{ $data }}</pre>

        <h2>Directivas condicionales</h2>
        <input type="number" v-model="edad" />
        Mi edad es : <strong>{{ edad }}</strong>
        <p style="color: red; font-weight: bold" v-if="edad && edad > 18">
          Eres mayor de edad
        </p>

        <p style="color: blue; font-weight: bold" v-if="!edad || edad <= 18">
          Eres menor de edad
        </p>

        <h2>Directivas iterativas</h2>
        <ol>
          <li v-for="pelicula in peliculas" :key="pelicula">{{ pelicula }}</li>
        </ol>
      </section>
    </div>
    <Sidebar></Sidebar>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Slider from "./Slider";
import Sidebar from "./Sidebar";

export default {
  name: "MiComponente",
  components: {
    Slider,
    Sidebar,
  },
  data() {
    return {
      subtitulo: "soy el subtitlo de Mi componente",
      nombre: "",
      edad: 18,
      peliculas: ["Batman vs Superman", "El señor de los anillos", "Spiderman"],
    };
  },
};
</script>