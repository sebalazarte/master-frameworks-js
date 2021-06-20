import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import Siderbar from './Sidebar';
//validacion de formulario y alertas
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";

class CreateArticle extends Component {

    constructor(props) {
        super(props);
        // Se carga el objeto para validar el formulario
        // En el curso utiliza el componentWillMount
        this.validator = new SimpleReactValidator(
            {
               locale: 'es',
               messages: { 
                   required: '* Este campo es requerido'
                }
            }
        );
    }

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
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
            axios.post(this.url + 'save', this.state.article)
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

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear articulo</h1>
                    <form className="mid-form" onSubmit={this.saveArticle} onChange={this.changeState}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onBlur={() => this.validator.showMessageFor('title')} />
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_dash_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="conent" ref={this.contentRef} onBlur={() => this.validator.showMessageFor('content')} />
                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_dash_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success" />

                    </form>

                </section>
                <Siderbar />
            </div>
        );
    }
}

export default CreateArticle;