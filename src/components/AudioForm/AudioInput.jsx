// Dependencies
import React from 'react';

const AudioInput = ({ setFileInfo, name, label, type }) => {


    return (
        <>
            <label className='audioForm__label' htmlFor={name}>
                {label}
                <input 
                    className='audioForm__file'
                    id={name}
                    type={type}
                    accept='audio/wav, audio/mp3, audio/aiff, audio/aac, audio/ogg, audio/flac' 
                    onChange={(event) => {
                        setFileInfo( event.currentTarget.files[0]);
                    }}
                />
            </label>
        </>
    );
};

export default AudioInput;