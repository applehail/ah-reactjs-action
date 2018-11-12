import { sendForm, formSendedOk, formSendedError } from '../actions';
import { SubmissionError } from 'redux-form';
import Config from '../config';

function getForm(formId)
{
    const form = document.getElementById(formId);
    if (!form) {
        return false;
    }
    let data = new FormData(form);

    Config.filesFields.forEach(function(field){

        Array.from(form[field + '_'].files).forEach(function(file, idx){
            data.append('file' + (idx + 1), file);
        });

    });
    return data;
}

export const saveUser = (values, dispatch, props) => {

    let form = getForm(props.formId);
    if (!form) {
        return false;
    }

    dispatch(sendForm(values));

    return fetch('/add', {
        method: 'post',
        body: form
    }).then((data) => {

        return data.json();

    }).then((data) => {

        //console.log(data);
        if (data.error) {

            throw new Error( data.error );
        }

        dispatch(formSendedOk(data));

    }).catch((error) => {

        dispatch(formSendedError(error));

        //console.log(error);
        throw new SubmissionError({
            promokod: error.message
            //, _error: data.error,
        });
    });
}
