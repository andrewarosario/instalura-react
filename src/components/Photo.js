import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PhotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.photo.urlPerfil} alt="foto do usuario" />

                    <figcaption className="foto-usuario">
                        <Link to={`/usuario/${this.props.photo.loginUsuario}`}>{this.props.photo.loginUsuario}</Link>
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
                    {this.props.photo.likers.map(liker => <Link to={`/usuario/${liker.login}`} key={liker.login} href="">{liker.login}, </Link>)} curtiram
                </div>

                <p className="foto-info-legenda">
                    <Link to="/" className="foto-info-autor">autor</Link>
                    {this.props.photo.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.photo.comentarios.map(comment => {
                            return (
                                <li key={comment.id} className="comentario">
                                    <Link to={`/usuario/${comment.login}`} className="foto-info-autor">{comment.login}</Link>
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
