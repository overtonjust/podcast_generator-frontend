// Dependencies
import React from 'react';
import './App.scss';
import { Formik, Form } from 'formik';

const App = () => {
  return (
    <form className='form'>
        <h1 className='form__header'>Podcast Generator</h1>
        <div className='form__options'>
          <button className='form__button'>Upload Audio</button> 
          <button className='form__button blue'>Enter Transcript</button>
        </div>
        <textarea className='form__textarea' name="" id="">Paste your transcript here...</textarea>
        <button className='form__submit' type="submit">Generate Podcast</button>
    </form>
  );

};

export default App;