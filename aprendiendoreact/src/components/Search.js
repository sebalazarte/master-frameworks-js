import React, { Component } from 'react';
import Slider from './Slider';
import Siderbar from './Sidebar';
import Articles from './Articles';

class Search extends Component {
    state = {
        articles: {},
        status: null
    }

    render() {
        let busqueda = this.props.match.params.search;
        return (
            <div id="search">
                <Slider
                    title={'Busqueda: ' + busqueda }
                    size="slider-small" />
                <div className="center">
                    <div id="content">
                        <Articles 
                            search={busqueda}
                            />
                    </div>
                </div>
                <Siderbar
                    blog="true"
                />
            </div>
        );
    }
}

export default Search;