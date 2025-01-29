// Dependencies
import React, { useState, useContext } from 'react';
import { FormContext } from '../../../context/FormContext';

// Components
import AudioInput from './AudioInput';
import { PiSparkle } from "react-icons/pi";


const AudioForm = () => {
    const { podcastData, setPodcastData, API, setLoading } = useContext(FormContext);
    const [ fileInfo, setFileInfo ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('audio', fileInfo);

            fetch(`${API}/gemini/audio`, {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .then(res => setPodcastData(res))

                setLoading(false);
    }
    
    return (
        <form className='audioForm' onSubmit={handleSubmit}>
                <AudioInput
                label='Insert Audio file'
                id='audioFile'
                type='file'
                setFileInfo={setFileInfo}
                />
            {/* <audio
                controls
                ref={audioRef}
                >
                Your browser does not support this audio element.
            </audio> */}
            <button className='form__submit' type="submit">Generate Podcast <PiSparkle/></button>
        </form>
    );
};

export default AudioForm;