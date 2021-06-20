import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Global from '../Global';
import ImagenDefault from '../assets/images/default.svg';
import Moment from 'react-moment';
import 'moment-timezone';
import "moment/locale/es";
import Sidebar from "./Sidebar";
import swal from 'sweetalert';

class Article extends Component {
    state = {
        article: false,
        status: null
    };

    url = Global.url;

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then((res) => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            })
            .catch((err) => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    componentDidMount() {
        this.getArticle();
    }

    deleteArticle = (id) => {

        swal({
            title: "Estas seguro?",
            text: "Una vez que sea borrado, no se podrá recuperar",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    axios.delete(this.url + 'article/' + id)
                        .then((res) => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });

                            swal(
                                'Articulo borrado',
                                'El articulo ha sido borrado correctamente',
                                'success'
                            );
                        })
                } else {
                    swal(
                        'Tranquilo',
                        'El articulo esta seguro',
                        'success'
                    );
                }
            });
    }

    render() {

        console.log(this.state.status);
        if (this.state.status === "deleted") {
            return (<Redirect to="/blog" />);
        }

        let article = this.state.article;

        return (
            <div className="center">
                <div id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {
                                    article.image != null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                    ) : (
                                        <img src={ImagenDefault} alt={article.title} />
                                    )
                                }
                            </div>
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment fromNow tz="America/Buenos_Aires" locale="es">{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>
                            <div className="buttons">
                                <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>
                                <button onClick={
                                    () => {
                                        this.deleteArticle(article._id);
                                    }
                                } className="btn btn-danger">Eliminar</button>
                            </div>
                            <div className="clearfix" />
                        </article>
                    }

                    {!this.state.article && this.state.status === "success" &&
                        <div className="article">
                            <h2 className="subheader">El articulo no existe</h2>
                            <p>Intentalo de nuevo mas tarde</p>
                        </div>

                    }

                    {this.state.status == null &&
                        <div className="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espere unos segundos</p>
                        </div>

                    }

                </div>
                <Sidebar blog='true' />
                <div className="clearfix" />
            </div>
        );
    }
}

export default Article;