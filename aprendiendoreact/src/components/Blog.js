import React, { Component } from 'react';
import Slider from './Slider';
import Siderbar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {
    state = {
        articles: {},
        status: null
    }
    
    render() {

        //debe ir afuera del render para que no se llame varias veces
        // axios.get('http://localhost:3900/api/articles/last')
        //     .then((res) => {
        //         console.log(res.data);
        //         this.setState({
        //             articles: res.data.articles,
        //             status: 'success'
        //         });
        //     })

        return (
            <div id="blog">
                <Slider
                    title="Blog"
                    size="slider-small" />
                <div className="center">
                    <div id="content">
                        {/* {this.state.status === 'success' &&
                            <div>
                                {this.state.articles.map((article) => {
                                    return (<p key={article._id}>{article.title}</p>)
                                })

                                }
                            </div>
                        } */}
                        <Articles/>
                    </div>
                </div>
                <Siderbar
                    blog="true"
                />
            </div>
        );
    }
}

export default Blog;