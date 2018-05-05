import PubSub from 'pubsub-js';

class TimelineStore {
    constructor(photos) {
        this.photos = photos;
    }

    subscribe = callback => {
        PubSub.subscribe('timeline', (topic, data) => {
            callback(data);
        });
    }

    like = photoId => {
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${photoId}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
            method: 'POST'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível realizar o like da foto.');
            }

            return response.json();
        }).then(liker => {
            const foundPhoto = this.photos.find(photo => photo.id === photoId)
            foundPhoto.likeada = !foundPhoto.likeada;

            const probLiker = foundPhoto.likers.find(thisLiker => thisLiker.login === liker.login);

            if (probLiker === undefined) {
                foundPhoto.likers.push(liker);
            } else {
                foundPhoto.likers = foundPhoto.likers.filter(thisLiker => thisLiker.login !== liker.login);
            }

            PubSub.publish('timeline', this.photos);
        });
    }

    comment = (photoId, commentText) => {
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${photoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
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
            const foundPhoto = this.photos.find(photo => photo.id === photoId);

            foundPhoto.comentarios.push(newComment);

            PubSub.publish('timeline', this.photos);
        });
    }

    list = url => {
        fetch(url).then(response => response.json()).then(photos => {
            this.photos = photos;

            PubSub.publish('timeline', this.photos);
        });
    }
}

export default TimelineStore;
