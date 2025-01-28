// Dependencies
import React from 'react';
import { useField } from 'formik';

const Textbox = ({...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
           <textarea {...field} {...props}></textarea> 
           {meta.touched && meta.error ? (
            <div className='errorMessage'>{meta.error}</div>
           ) : null}
        </>  
    );
};

export default Textbox;