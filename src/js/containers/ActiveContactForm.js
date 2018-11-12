import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ContactForm } from '../components/ContactForm';
import { saveUser } from '../api/saveUser';
import Config from '../config';

const validate = (values, props) => {

    const errors = {}
    const labels = Config.messages;
    const requiredFields = Config.requiredFields;
    const form = document.getElementById(props.formId);

    requiredFields.forEach( field => {

        let error = false;

        // file field

        error = (values[field] != undefined && !values[field]);

        if (error) {
            errors[field] = labels.required;
        }
    });

    if (values.promokod) {
        if (!/^[а-я0-9]{9}$/i.test(values.promokod)) {
            errors.promokod = labels.promokod;
        }
    }

    if (values.email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = labels.email;
        }
    }

    return errors
}

let form = reduxForm({form: 'contact', validate})(ContactForm);
form = connect(
    store => ({
        formId: Config.formId,
        formStatus: store.formStatus,
        onSubmit: saveUser,
        initialValues: Config.test ? Config.initialTestValues : Config.initialValues
    })
)(form);

export default form;