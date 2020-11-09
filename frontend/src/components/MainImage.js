import React from 'react';
import Typography from "@material-ui/core/Typography";
import "../styles/home.css"

function MainImage({image, text, title}) {
    return (
        <div style={{ background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), url('${image}'), #1c1c1c`, height: '480px', backgroundSize: '100%, cover', backgroundPosition: 'center, center', width:'100%', position: 'relative'}}>
            <div className="title">
                <Typography variant="h2" style={{color: 'white'}}>{title}</Typography>
                <p style={{color: 'white', fontSize:'1rem'}}>{text}</p>
            </div>
        </div>
    );
}

export default MainImage;