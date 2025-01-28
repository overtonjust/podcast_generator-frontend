// Dependencies
import React from 'react';
import { useField } from 'formik';

const AudioInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props} accept='audio/wav, audio/mp3, audio/aiff, audio/aac, audio/ogg, audio/flac' />
            {meta.touched && meta.error ? (
                <div className='errorMessage'>{meta.error}</div>
            ) : null}
        </>
    );
};

export default AudioInput;