// Dependencies
import React, { useState, useEffect } from 'react';
import { FormContext } from '../context/FormContext';
import './App.scss';

// Components
import TextForm from './components/TextForm/TextForm';
import AudioForm from './components/AudioForm/AudioForm';
import { FadeLoader } from 'react-spinners';
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineTextFields } from "react-icons/md";


const App = () => {
  const API = import.meta.env.VITE_API;
  const [activeBtn, setActiveBtn] = useState('audio');
  const [textSpeaking, setTextSpeaking] = useState(true);
  const [podcastData, setPodcastData] = useState('');
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {

  },[loading])

  return (
    <FormContext.Provider
      value={{
        podcastData,
        setPodcastData,
        API,
        setLoading
      }}
    >
      <main className='form'>
          <FaMicrophoneAlt className='form__icon'/>
          <h1 className='form__header'>Podcast Generator</h1>
          <div className='form__options'>
            <button 
              type='button'
              className={`form__button ${activeBtn === 'audio' && 'active'}`}
              onClick={() => setActiveBtn('audio')}
              ><FaMicrophoneAlt/>Upload Audio
            </button> 
            <button 
              type='button'
              className={`form__button ${activeBtn === 'text' && 'active'}`}
              onClick={() => setActiveBtn('text')}
              ><MdOutlineTextFields/>Enter Transcript
            </button>
          </div>
          {activeBtn === 'audio' ?
           <AudioForm/> :
           <TextForm/>
          }
          {loading && 
            <FadeLoader/> 
          }
          {podcastData.length > 1 &&
            <button className='form__button' type='button' onClick={handleSpeechPause}>{textSpeaking ? 'Pause' : 'Resume'}</button>
          }
      </main>
    </FormContext.Provider>
  );

};

export default App;