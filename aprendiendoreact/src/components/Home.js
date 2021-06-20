import React, { Component } from 'react';
import Slider from './Slider';
import Siderbar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    state = {}
    render() {
        return (
            <div id="home">
                <Slider title="Bienvenido al curso" btn="Ir al blog" />
                <div className="center">
                    <div id="content">
                        <h2 className="subheader">Ultimos artulos   </h2>
                        <Articles home="true"/>
                    </div>
                </div>
                <Siderbar />
            </div>
        );
    }
}

export default Home;