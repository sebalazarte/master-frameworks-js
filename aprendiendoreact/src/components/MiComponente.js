import React, {Component} from 'react';

class MiComponente extends Component{
    render(){

        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamon cocido'],
            calorias: 400
        };

        return (
            <React.Fragment>
                <h1>{'Receta: ' + receta.nombre}</h1>
                <h2>{'Calorias: ' + receta.calorias}</h2>
                {this.props.saludo &&
                    <h3>{this.props.saludo}</h3>
                }
                <ol>
                {
                    receta.ingredientes.map((ingrediente, i) => {
                        return(
                            <li key={i}>
                                {ingrediente}
                            </li>);
                    })
                }
                </ol>
            </React.Fragment>
        );
    }
}

export default MiComponente;