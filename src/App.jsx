// Dependencies
import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import './App.scss';

// Components
import AudioInput from './components/AudioInput';
import Textbox from './components/Textbox';

const App = () => {
  const API = import.meta.env.VITE_API;
  const [activeBtn, setActiveBtn] = useState('audio');
  const [podcastData, setPodcastData] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {

  },[podcastData])

  return (
    <Formik
    initialValues={{
      audioFile: '',
      transcript: '',
    }}
    onSubmit={ async (values, { setSubmitting }) => {
     const response = await fetch(`${API}/gemini/${activeBtn === 'audio' ? '' : 'transcript'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activeBtn === 'audio' ? 
              { audio: values.audioFile } :  
              { transcript: values.transcript }),
      });
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log(audioRef)
      if(audioRef.current) {
        audioRef.current.src = audioUrl
        await audioRef.current.play()
      }

      setPodcastData(true)
      setSubmitting(false);
    }}
    >
      <Form className='form'>
          <h1 className='form__header'>Podcast Generator</h1>
          <div className='form__options'>
            <button 
              type='button'
              className={`form__button ${activeBtn === 'audio' && 'active'}`}
              onClick={() => setActiveBtn('audio')}
              >Upload Audio
            </button> 
            <button 
              type='button'
              className={`form__button ${activeBtn === 'text' && 'active'}`}
              onClick={() => setActiveBtn('text')}
              >Enter Transcript
            </button>
          </div>
          {activeBtn === 'audio' ?
            <AudioInput
              label='Insert Audio file'
              name='audioFile'
              type='file'
            />
            : 
            <Textbox
              className='form__textarea'
              name='transcript'
              placeholder='Paste your transcript here...'
            />
          }
          <button className='form__submit' type="submit">Generate Podcast</button>
          <audio
            controls
            ref={audioRef}
            >
              Your browser does not support this audio element.
          </audio>
      </Form>
    </Formik>
  );

};

export default App;