// Dependencies
import React, { useState, useEffect, useRef } from 'react';
import { FormContext } from '../context/FormContext';
import './App.scss';

// Components
import TextForm from './components/TextForm/TextForm';
import AudioForm from './components/AudioForm/AudioForm';

const App = () => {
  const API = import.meta.env.VITE_API;
  const [activeBtn, setActiveBtn] = useState('audio');
  const [textSpeaking, setTextSpeaking] = useState(true)
  const [podcastData, setPodcastData] = useState('');
  const audioRef = useRef(null);
  const synth = window.speechSynthesis;
  
  const handleSpeechPause = () => {
    if(textSpeaking) {
      synth.pause()
      setTextSpeaking(false)
    } else {
      synth.resume()
      setTextSpeaking(true)
    }
  }

  useEffect(() => {
    const utterThis = new SpeechSynthesisUtterance(podcastData);
    synth.speak(utterThis);

  },[podcastData])

  return (
    <FormContext.Provider
      value={{
        podcastData,
        setPodcastData,
        API
      }}
    >
      <main className='form'>
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
           <AudioForm/> :
           <TextForm/>
          }
          <div>{podcastData}</div>
          <button className='form__button' type='button' onClick={handleSpeechPause}>{textSpeaking ? 'Pause' : 'Resume'}</button>
      </main>
    </FormContext.Provider>
  );

};

export default App;