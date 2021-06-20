import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import Siderbar from './Sidebar';
//validacion de formulario y alertas
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";
import ImagenDefault from '../assets/images/default.svg';

class EditArticle extends Component {

    constructor(props) {
        super(props);
        // Se carga el objeto para validar el formulario
        // En el curso utiliza el componentWillMount
        this.validator = new SimpleReactValidator(
            {
                messages: {
                    required: '* Este campo es requerido'
                }
            }
        );

        this.articleId = props.match.params.id;
    }

    articleId = null;
    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    getArticle = (id) => {
        // var id = this.props.match.params.id;
        axios.get(this.url + 'article/' + id)
            .then((res) => {
                this.setState({
                    article: res.data.article,
                });
            })
            .catch((err) => {
                this.setState({
                    article: false,
                });
            });
    }

    componentDidMount() {
        this.getArticle(this.articleId);
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        })
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    saveArticle = (e) => {
        e.preventDefault();
        this.changeState();

        if (this.validator.allValid()) {
            axios.put(this.url + 'article/' + this.articleId, this.state.article)
                .then((res) => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo creado',
                            'Articulo ha sido creado correctamente',
                            'success'
                        );

                        if (this.state.selectedFile !== null) {
                            //sacar el id del articulo guarda
                            let articleId = this.state.article._id;

                            //crear el form data y añadir el fichero
                            const formData = new FormData();
                            console.log(this.state.selectedFile);
                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            //realizo peticion ajax para subir
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then((res) => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                })

                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                });
        } else {
            this.setState({
                status: 'failed'
            })
            this.validator.showMessages();
            this.forceUpdate();
        }
    }



    render() {

        if (this.state.status === "success") {
            return (<Redirect to={'/blog'} />);
        }
        
        let article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar articulo</h1>

                    {article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle} onChange={this.changeState}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text"
                                    name="title"
                                    defaultValue={this.state.article.title}
                                    ref={this.titleRef}
                                    onBlur={() => this.validator.showMessageFor('title')} />
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_dash_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea
                                    name="conent"
                                    defaultValue={this.state.article.content}
                                    ref={this.contentRef}
                                    onBlur={() => this.validator.showMessageFor('content')} />
                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_dash_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <div className="image-wrap">
                                    {
                                        article.image != null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} className="image-thumb" />
                                        ) : (
                                            <img src={ImagenDefault} alt={article.title} className="image-thumb" />
                                        )
                                    }
                                </div>
                                <input type="file" name="file0" onChange={this.fileChange} />
                            </div>

                            <input type="submit" value="Guardar" className="btn btn-success" />

                        </form>
                    }

                    {!this.state.article.title &&
                        <h2 className="subheader">Cargando</h2>
                    }



                </section>
                <Siderbar />
            </div>
        );
    }
}

export default EditArticle;