import React, { Component } from 'react';
import videobaseapi from '../apiservices/videobaseapi';

class WatchVideo extends Component {
    constructor(props){
        super(props);

        this.state = {
            videoId:this.props.match.params.videoId,
            apiKey:'AIzaSyCS_FQHdzw5aJctL868MrlsipifSglq6-w',
            searchEndpoint:'"https://www.googleapis.com/youtube/v3/search"',
            videoEndpoint:'https://youtube.googleapis.com/youtube/v3/videos',
            videopref:'https://www.youtube.com/embed',
            snippet:{}
        };
        this.goBack = this.goBack.bind(this);
    }

     getVideoDetails(videoId){
        const part = 'snippet';
        const url = `?part=${part}&id=${videoId}&key=${this.state.apiKey}`;
        videobaseapi.get(url).then(res=>{
            const snippet = res.data.items[0].snippet;
            this.setState({snippet:snippet});
            console.log('video details',snippet);
        })
       
    }

    componentDidMount(){
        this.getVideoDetails(this.state.videoId);
    }

    goBack = (event) =>{
        this.props.history.push('/');
    }

    renderNoVideo(){
        return (
            <h3>Sorry, no video has been added yet.</h3>
        );
    }

    render() {
        const videoUrl = `${this.state.videopref}/${this.state.videoId}`;
        return (
            <div className="container">
                <div className="row d-flex justify-content-start mt-2">
                    <button className="btn btn-primary" onClick={this.goBack}>Back</button>
                </div>
                <div className="row d-flex justify-content-start mt-2" >
                    <div style={{overflowY:"scroll", height:"450px"}}>
                        <div className="card" style={{width: "50rem", height:"auto"}} >
                            <div className="card-header">
                                <h5 className="card-title">{this.state.snippet.title}</h5>
                                <h6 className="card-subtitle text-secondary">{this.state.snippet.channelTitle}</h6>
                            </div>
                            <div className="card-body d-flex flex-column">
                                <iframe title="heroVideo" width="100%" height="300rem" src={videoUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <span>Description:</span>
                                <strong>{this.state.snippet.description}</strong>
                                <span>Tags:</span>
                                <div className="d-flex align-content-start flex-wrap">
                                    {
                                        this.state.snippet.tags
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WatchVideo;