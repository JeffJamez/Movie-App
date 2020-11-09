import React from 'react';
import '../styles/gridcard.css'

function GridCard({image, movieId, actor}) {
    if (actor){
        return (
            <div  className="grid-card">
                <img style={{width: '90%', height:'360px'}} src={image} alt='image here' />
            </div>
        );
    } else {
        return (
            <div  className="grid-card">
                <a href={`/movie/${movieId}`}>
                    <img style={{width: '90%', height:'360px'}} src={image} alt='image here' />
                </a>
            </div>
        );
    }

}

export default GridCard;