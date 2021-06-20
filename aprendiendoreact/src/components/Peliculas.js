import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Siderbar from './Sidebar';
import Slider from './Slider';

class Peliculas extends Component {

    state = {
        peliculas: [
            { year: 2019, title: 'Spiderman', image: 'https://as.com/meristation/imagenes/2019/10/15/noticias/1571137562_437495_1571137608_noticia_normal.jpg' },
            { year: 2018, title: 'Vengadores', image: 'https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVixGzDct56-tsHGWLZwtml5CejHjH2jjmxSag8NKtgyx7MNfqzhcC5192uzJoo-dpVg0SvdMiLqD37Sx4-MPCRgK0od.jpg?r=2a9' },
            { year: 2015, title: 'Batman vd Superman', image: 'https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg' },
            { year: 2015, title: 'Batman vd Superman', image: 'https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg' }
        ],
        nombre: "Sebastian Lazarte",
        favorita: {}
    };

    cambiarTitulo = () => {
        const { peliculas } = this.state;
        peliculas[0].title = "Batman begins";
        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        })
    }

    render() {

        const pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        return (
            <div id="peliculas">
                <Slider
                    title="Peliculas"
                    size="slider-small" />

                <div className="center">

                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de peliculas</h2>
                        <p>Seleccion de las peliculas favoritas de {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiarTitulo} >
                                Cambiar titulo de Batman
                    </button>
                        </p>

                        {/* {this.state.favorita.title &&
                    <p className="favorita" style={pStyle}>
                        <strong>La pelicula favorita es: </strong>
                        <span>{this.state.favorita.title}</span>
                    </p>
                } */}


                        {this.state.favorita.title ? (
                            <p className="favorita" style={pStyle}>
                                <strong>La pelicula favorita es: </strong>
                                <span>{this.state.favorita.title}</span>
                            </p>
                        ) : (
                            <p>No hay pelicula favorita</p>
                        )
                        }

                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />)
                                })
                            }
                        </div>
                    </div >
                    <Siderbar />
                </div>
            </div>
        );
    }
}

export default Peliculas;