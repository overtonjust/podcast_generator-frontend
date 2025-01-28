// Dependencies
import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { FormContext } from '../../../context/FormContext';

// Components
import Textbox from './Textbox';

const TextForm = () => {
    const { podcastData, setPodcastData, API } = useContext(FormContext);

    return (
        <Formik
        initialValues={{
          transcript: '',
        }}
        onSubmit={  (values, { setSubmitting }) => {
         fetch(`${API}/gemini/transcript`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transcript: values.transcript }),
          })
            .then(res => res.json())
            .then(res => setPodcastData(res))
          
          // const audioBlob = await response.blob();
          // const audioUrl = URL.createObjectURL(audioBlob);
          // if(audioRef.current) {
          //   audioRef.current.src = audioUrl
          //   await audioRef.current.play()
          // }
    
          setSubmitting(false);
        }}
        >
          <Form >
                <Textbox
                  className='form__textarea'
                  name='transcript'
                  placeholder='Paste your transcript here...'
                />
              {/* <audio
                controls
                ref={audioRef}
                >
                  Your browser does not support this audio element.
              </audio> */}
            <button className='form__submit' type="submit">Generate Podcast</button>
          </Form>
        </Formik>
    );
};

export default TextForm;