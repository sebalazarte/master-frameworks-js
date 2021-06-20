import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/es';

import LastArticles from './components/LastArticles.vue';
import MiComponente from './components/MiComponente';
import HelloWorld from './components/HelloWorld.vue';
import Blog from './components/Blog.vue';
import Formulario from './components/Formulario.vue';
import Pagina from './components/Pagina.vue';
import ErrorComponent from './components/ErrorComponent';
import Peliculas from './components/Peliculas';
import Search from './components/Search.vue'
import Redirect from './components/Redirect.vue';
import Article from './components/Article.vue';
import CreateArticle from './components/CreateArticle.vue';
import EditArticle from './components/EditArticle';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuelidate);

//esto se puede hacer asi o usando los import
// const moment = require('moment');
// require('moment/locale/es');
// Vue.use(require('vue-moment'), { 
//   moment
// } );

Vue.use(VueMoment, {moment});


const routes = [
    {path: '/', component: LastArticles},
    {path: '/home', component: LastArticles},
    {path: '/ultimos-articulos', component: LastArticles},
    {path: '/hola-mundo', component: HelloWorld},
    {path: '/mi-componente', component: MiComponente},
    {path: '/blog', component: Blog},
    {path: '/Formulario', component: Formulario},
    {path: '/Pagina/:id?', name:'pagina', component: Pagina},
    {path: '*', component: ErrorComponent},
    {path: '/Formulario', component: Formulario},
    {path: '/peliculas', name:'peliculas', component: Peliculas},
    {path: '/buscador/:searchString', component: Search},
    {path: '/redirect/:searchString', component: Redirect },
    {path: '/articulo/:id', name: 'article', component: Article},
    {path: '/crear-articulo', component: CreateArticle},
    {path: '/editar/:id', name:'edit', component: EditArticle}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
