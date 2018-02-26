import React, { Component } from 'react';
import Photo from './Photo';

class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: []
        };
    }

    componentDidMount() {
        fetch(`http://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('token')}`)
            .then(response => response.json())
            .then(photos => {
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
