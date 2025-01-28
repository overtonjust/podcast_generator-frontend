// Dependencies
import React from 'react';

const AudioInput = ({ setFileInfo, name, label, type }) => {


    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input 
                name={name}
                type={type}
                accept='audio/wav, audio/mp3, audio/aiff, audio/aac, audio/ogg, audio/flac' 
                onChange={(event) => {
                    setFileInfo( event.currentTarget.files[0]);
                }}
            />
        </>
    );
};

export default AudioInput;