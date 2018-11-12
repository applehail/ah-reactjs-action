import React from 'react';
import InputFile from './InputFile';

const InputImage = ( props ) => {

    return (
        <InputFile {...props} accept="image/*" />
    )
}

export default InputImage;