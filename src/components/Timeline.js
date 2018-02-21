import React, { Component } from 'react';
import Photo from './Photo';

class Timeline extends Component {
    render() {
        return (
            <div className="fotos container">
                <Photo />
                <Photo />
            </div>
        );
    }
}

export default Timeline;
