// Dependencies
import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { FormContext } from '../../../context/FormContext';
import '../Form.scss'

// Components
import Textbox from './Textbox';
import { PiSparkle } from "react-icons/pi";


const TextForm = () => {
    const { podcastData, setPodcastData, API, setLoading } = useContext(FormContext);

    return (
        <Formik
        initialValues={{
          transcript: '',
        }}
        onSubmit={  (values, { setSubmitting }) => {
            setLoading(true)
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
            setLoading(false)
            setSubmitting(false);
        }}
        >
          <Form className='textForm' >
                <Textbox
                  className='textForm__input'
                  name='transcript'
                  placeholder='Paste your transcript here...'
                />
              {/* <audio
                controls
                ref={audioRef}
                >
                  Your browser does not support this audio element.
              </audio> */}
            <button className='form__submit' type="submit">Generate Podcast<PiSparkle/></button>
          </Form>
        </Formik>
    );
};

export default TextForm;