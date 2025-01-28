// Dependencies
import React, { useState, useContext } from 'react';
import { FormContext } from '../../../context/FormContext';

// Components
import AudioInput from './AudioInput';

const AudioForm = () => {
    const { podcastData, setPodcastData, API } = useContext(FormContext);
    const [ fileInfo, setFileInfo ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('audio', fileInfo);
        console.log(fileInfo, formData);

            fetch(`${API}/gemini/audio`, {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .then(res => setPodcastData(res))

    }
    
    return (
        <form  onSubmit={handleSubmit}>
                <AudioInput
                label='Insert Audio file'
                name='audioFile'
                type='file'
                setFileInfo={setFileInfo}
                />
            {/* <audio
                controls
                ref={audioRef}
                >
                Your browser does not support this audio element.
            </audio> */}
            <button className='form__submit' type="submit">Generate Podcast</button>
        </form>
    );
};

export default AudioForm;