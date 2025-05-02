import React from 'react';

const agedPaper = '#FBF3E4';

export const Notebook = ({ items }) => {
    const paperStyle = {
        margin: '10px auto',
        padding: '50px 20px 5px 0',
        position: 'relative',
        borderRadius: '5px',
        boxShadow: '3px 3px 3px rgba(0,0,0,0.2), 0px 0px 6px rgba(0,0,0,0.2)',
        background: `linear-gradient(to bottom, ${agedPaper} 29px, #00b0d7 1px)`,
        backgroundSize: '100% 30px',
        backgroundRepeat: 'repeat',
        height: 'auto',
        overflow: 'visible',
        color: '#333',
    };

    const marginLineStyle = {
        position: 'absolute',
        top: 0,        
        bottom: 0,     
        left: '50px',
        width: '1px',
        background: '#db4034',
        zIndex: 1
    };

    const headerStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30px',
        background: agedPaper
    };

    const contentStyle = {
        marginTop: '17px',
        marginLeft: '60px',
        fontSize: '25px',
        lineHeight: '30px',
        fontFamily: 'helvetica neue, helvetica, arial, sans-serif',
        fontWeight: 200
    };

    const paragraphStyle = {
        margin: '0 0 30px 0',
        fontFamily: "'Caveat', cursive",
    };

    return (
        <div style={paperStyle}>
        <div style={marginLineStyle} />

        <header style={headerStyle}>
        </header>

        <div id="content" style={contentStyle}>
            {items.map((text, i) => (
            <p key={i} style={paragraphStyle}>
                {text}
            </p>
            ))}
        </div>
        </div>
    );
};