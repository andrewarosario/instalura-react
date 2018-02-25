import React, { Component } from 'react';

class PhotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.photo.urlPerfil} alt="foto do usuario" />

                    <figcaption className="foto-usuario">
                        <a href="">{this.props.photo.loginUsuario}</a>
                    </figcaption>
                </figure>

                <time className="foto-data">{this.props.photo.horario}</time>
            </header>
        );
    }
}

class PhotoInfo extends Component {
    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    {this.props.photo.likers.map(liker => <a key={liker.login} href="">{liker.login}, </a>)} curtiram
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">autor</a>
                    {this.props.photo.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.photo.comentarios.map(comment => {
                            return (
                                <li key={comment.id} className="comentario">
                                    <a className="foto-info-autor">{comment.login}</a>
                                    {comment.texto}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

class PhotoUpdates extends Component {
    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="" className="fotoAtualizacoes-like">Likar</a>

                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}

class Photo extends Component {
    render() {
        return (
            <div className="foto">
                <PhotoHeader photo={this.props.photo} />

                <img src={this.props.photo.urlFoto} alt="foto" className="foto-src" />

                <PhotoInfo photo={this.props.photo} />
                <PhotoUpdates />
            </div>
        );
    }
}

export default Photo;
