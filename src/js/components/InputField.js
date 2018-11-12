import React from 'react';
import InputMask from 'react-input-mask';
import InputFile from './InputFile';
import InputImage from './InputImage';

const InputField = ({ input, label, type, meta: { touched, error, warning } }) => {

    const max = input.name === 'promokod' ? 9 : '';
    let InputElement;
    let labelAfter = false;
    let cl = 'form-control';
    let clField = 'form-group';
    let clLabel = '';

    if (type === 'checkbox') {
        labelAfter = true;
        cl = 'form-check-input';
        clField += ' form-check';
        clLabel += ' form-check-label';
    }

    const errored = (error || warning);

    cl += (touched && error) ? ' is-invalid' : '';

    switch (type) {
        case 'file':
            InputElement = <InputFile {...input} error={errored} className={cl} />;
            break;
        case 'image':
            InputElement = <InputImage {...input} error={errored} className={cl} />;
            break;
        case 'phone':
            InputElement = <InputMask {...input} mask="+7 (999) 999-99-99" maskChar="_" className={cl} id={input.name} placeholder={label} type={type} maxLength={max} />;
            break;
        default:
            InputElement = <input {...input} className={cl} id={input.name} placeholder={label} type={type} maxLength={max} />;
            break;
    }

    const add = input.name === 'confirm1' ? <span> с <a download="" href="/public/pravila_aktsii.doc">правилами акции</a></span> : '';
    const LabelElement = <label className={clLabel} htmlFor={input.name}>{label}{add}</label>;


    return (
        <div className={clField}>
        { labelAfter ? <React.Fragment>{InputElement}{LabelElement}</React.Fragment> : <React.Fragment>{LabelElement}{InputElement}</React.Fragment> }
            {touched && ((error && <div className="invalid-feedback">{error}</div>) || (warning && <div className="invalid-feedback">{warning}</div>))}
        </div>
    );
}

export default InputField;