import React, { Component } from 'react';
import Siderbar from './Sidebar';

class Formulario extends Component {
    state = {
        user: {}
    }

    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    recibirFormulario = (e) => {
        e.preventDefault();
        let genero = 'hombre';

        if (this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value;
        } else if (this.generoMujerRef.current.checked) {
            genero = this.generoMujerRef.current.value;
        } else {
            genero = this.generoOtroRef.current.value;
        }

        let user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }

        this.setState({
            user: user
        });

        console.log(user);
    }

    render() {
        return (
            <div id="formulario">
                <div className="center">
                    <div id="content">

                        <h1 className="subheader">Formulario</h1>

                        {this.state.user.nombre &&
                            <div id="user-data">
                                <p>nombre: <strong>{this.state.user.nombre}</strong></p>
                                <p>apellido: <strong>{this.state.user.apellido}</strong></p>
                                <p>bio: <strong>{this.state.user.bio}</strong></p>
                                <p>genero: <strong>{this.state.user.genero}</strong></p>
                            </div>
                        }

                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario} >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidoRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" defaultValue={""} ref={this.bioRef} />
                            </div>
                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" defaultValue="hombre" ref={this.generoHombreRef} /> Hombre
                                <input type="radio" name="genero" defaultValue="mujer" ref={this.generoMujerRef} /> Mujer
                                <input type="radio" name="genero" defaultValue="otro" ref={this.generoOtroRef} /> Otro
                            </div>
                            <div className="clearfix" />
                            <input type="submit" defaultValue="Enviar" className="btn btn-success" />
                        </form>

                    </div>
                </div>
                <Siderbar
                    blog="false"
                />
            </div>
        );
    }
}

export default Formulario;