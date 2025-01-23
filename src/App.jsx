// Dependencies
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import './App.scss';

// Components
import AudioInput from './components/AudioInput';
import Textbox from './components/Textbox';

const App = () => {
  const [activeBtn, setActiveBtn] = useState('audio');

  return (
    <Formik
    initialValues={{
      audioFile: '',
      transcript: '',
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400)
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
      </Form>
    </Formik>
  );

};

export default App;