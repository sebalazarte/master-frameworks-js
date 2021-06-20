import React, { Component } from 'react';
import MiComponente from './MiComponente';

class SeccionPruebas extends Component {

    contardor = 0;

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         contardor: 0
    //     };
    // }

    state = {
        contardor : 0
    };

    sumar = () => {
        //this.contardor = this.contardor +1;
        this.setState({
            contardor: (this.state.contardor + 1)
        })
    }
    
    restar = () => {
        //this.contardor = this.contardor -1;
        this.setState({
            contardor: (this.state.contardor - 1)
        })
    }

    MostrarPresentacion(nombre, apellido) {
        var presentacion = (
            <div>
                <h3>{nombre}</h3>
                <h3>{apellido}</h3>
            </div>);
    
        return presentacion;
    }

    render() {
        return (
            <section id="content">
                <h2 className="subheader">Curso React</h2>
                {this.MostrarPresentacion('Sebastian', 'Lazarte')}
                <MiComponente />
                <hr />
                <p>Contador: {this.state.contardor}</p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar} />
                    <input type="button" value="Restar" onClick={this.restar} />
                </p>

            </section>
        );
    }
}

export default SeccionPruebas;

