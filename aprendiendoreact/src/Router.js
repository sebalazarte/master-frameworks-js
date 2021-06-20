import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import SeccionPruebas from './components/SeccionPruebas';
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Article from './components/Article';
import Search from './components/Search';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {
    state = {}
    render() {
        return (
            <BrowserRouter>

                <Header />
                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/articulo/:id" component={Article} />
                    <Route exact path="/blog/busqueda/:search" component={Search} />
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            let search = props.match.params.search;
                            return(<Redirect to={'/blog/busqueda/'+ search} />)
                        }
                    } />
                    <Route exact path="/blog/crear" component={CreateArticle} />
                    <Route exact path="/blog/editar/:id" component={EditArticle} />
                    <Route exact path="/formulario" component={Formulario} />
                    <Route exact path="/peliculas" component={Peliculas} />


                    <Route path="/ruta-prueba" component={SeccionPruebas} />
                    <Route path="/segunda-ruta" component={MiComponente} />
                    <Route exact path="/pagina-1" render={() => (
                        <React.Fragment>
                            <h1>Hola mundo desde la ruta pagina 1</h1>
                            <MiComponente saludo="Hola mundo" />
                        </React.Fragment>
                    )} />

                    <Route exact path="/pagina-2/:id" render={(props) => {
                        let id = props.match.params.id;

                        return (
                            <div id="content">
                                <h1>Pagina 2</h1>
                                <h2>{id}</h2>
                            </div>
                        )
                    }
                    } />

                    <Route exact path="/pruebas/:nombre/:apellido?" render={(props) => {
                        let nombre = props.match.params.nombre;
                        let apellido = props.match.params.apellido;

                        return (
                            <div id="content">
                                <h1>Pruebas de parametros opcionales por la url 2</h1>
                                <h2>{nombre} {apellido}</h2>
                            </div>
                        )
                    }
                    } />

                    <Route component={Error} />
                </Switch>

                <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;