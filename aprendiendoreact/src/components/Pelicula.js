import React, { Component } from 'react';

class Pelicula extends Component {
    state = {  }

    marcar = () => {
        this.props.marcarFavorita(this.props.pelicula, this.props.indice);
    }

    render() { 
        const {title, image} = this.props.pelicula;

        return (  
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={title} />
                </div>
                <h2>{title}</h2>
                <span className="date">
                    Hace 5 minutos
                </span>
                <button onClick={this.marcar}>Marcar como favorita</button>
                {/* eslint-disable-next-line */}
                <a href="#">Leer más</a>
                <div className="clearfix" />
            </article>
        );
    }
}
 
export default Pelicula;