import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import "moment/locale/es";
import Global from '../Global';
import ImagenDefault from '../assets/images/default.svg';
import { Link } from "react-router-dom";

class Articles extends Component {
    state = {
        articles: [],
        status: null
    }

    url = Global.url;

    getArticles = () => {
        axios.get(this.url + 'articles')
            .then((res) => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            })
    }

    getLastArticles = () => {
        axios.get(this.url + 'articles/last')
            .then((res) => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            })
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url + 'search/' + searched)
            .then((res) => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            })
            .catch((err) =>{
                this.setState({
                    articles: [],
                    status: 'success'
                });
            });
    }

    componentDidMount() {
        let home = this.props.home;
        let search = this.props.search;
        if (home === "true") {
            this.getLastArticles();
        } else if (search && search !== null && search !== undefined) {
            this.getArticlesBySearch(search);
        } else {
            this.getArticles();
        }
    }

    render() {
        if (this.state.articles.length > 0) {
            var lista = this.state.articles.map((article) => {
                return (
                    <article className="article-item" key={article._id}>
                        <div className="image-wrap">
                            {
                                article.image != null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                    <img src={ImagenDefault} alt={article.title} />
                                )
                            }
                        </div>
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow tz="America/Buenos_Aires" locale="es">{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer mas</Link>
                        <div className="clearfix" />
                    </article>

                )
            });

            return (
                <div id="articles">
                    <h1>Listado de articulos</h1>
                    {lista}
                </div>
            );
        } else if (this.state.articles.length === 0) {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavia no hay contenido en esta seccion</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando ...</h2>
                    <p>Espero mientras se carga el contenido</p>
                </div>
                
            );
        }
    }
}

export default Articles;