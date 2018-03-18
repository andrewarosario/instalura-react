import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Photo from './Photo';

class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: []
        };

        this.login = this.props.login;
    }

    componentWillMount() {
        PubSub.subscribe('timeline', (topic, data) => {
            this.setState({
                photos: data.photos
            });
        });

        PubSub.subscribe('update-liker', (topic, data) => {
            const foundPhoto = this.state.photos.find(photo => photo.id === data.photoId)
            foundPhoto.likeada = !foundPhoto.likeada;

            const probLiker = foundPhoto.likers.find(liker => liker.login === data.liker.login);

            if (probLiker === undefined) {
                foundPhoto.likers.push(data.liker);
            } else {
                foundPhoto.likers = foundPhoto.likers.filter(liker => liker.login !== data.liker.login);
            }

            this.setState({
                photos: this.state.photos
            });
        });

        PubSub.subscribe('new-comment', (topic, data) => {
            const foundPhoto = this.state.photos.find(photo => photo.id === data.photoId);

            foundPhoto.comentarios.push(data.newComment);

            this.setState({
                photos: this.state.photos
            });
        });

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

    like = photoId => {
        fetch(`http://instalura-api.herokuapp.com/api/fotos/${photoId}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
            method: 'POST'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível realizar o like da foto.');
            }

            return response.json();
        }).then(liker => {
            PubSub.publish('update-liker', { liker, photoId });
        });
    }

    comment = (photoId, commentText) => {
        fetch(`http://instalura-api.herokuapp.com/api/fotos/${photoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
            method: 'POST',
            body: JSON.stringify({
                texto: commentText
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível realizar o comentário da foto.');
            }

            return response.json();
        }).then(newComment => {
            PubSub.publish('new-comment', { newComment, photoId });
        });
    }

    render() {
        return (
            <div className="fotos container">
                {this.state.photos.map(photo => <Photo key={photo.id} photo={photo} like={this.like} comment={this.comment} />)}
            </div>
        );
    }
}

export default Timeline;
