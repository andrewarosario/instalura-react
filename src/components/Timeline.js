import React, { Component } from 'react';
import Photo from './Photo';

class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: []
        };

        this.login = this.props.login;
    }

    componentDidMount() {
        this.loadPhotos();
    }

    componentWillReceiveProps(nextProps) {
        this.login = nextProps.login;

        this.loadPhotos();
    }

    loadPhotos = () => {
        let url;
        if (this.login === undefined) {
            url = `http://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('token')}`;
        } else {
            url = `http://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
        }

        fetch(url).then(response => response.json()).then(photos => {
            this.setState({
                photos: photos
            });
        });
    }

    render() {
        return (
            <div className="fotos container">
                {this.state.photos.map(photo => <Photo key={photo.id} photo={photo} />)}
            </div>
        );
    }
}

export default Timeline;
