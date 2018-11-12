import React from 'react';
import { Field } from 'redux-form';
import Config from '../config';
import { FormStatuses } from '../actions';
import InputField from './InputField';

export const ContactForm = (props) => {

    const { formId, saveUser, formStatus, handleSubmit, submitting } = props;
    const cl = 'form form--' + formStatus + (submitting ? ' form--loading' : '');
    const ok = formStatus === FormStatuses.SENDED_OK ? <div className="alert alert-success">{Config.messages.success}</div> : '';
    const error = formStatus === FormStatuses.SENDED_ERROR ? <div className="alert alert-danger">{Config.messages.error}</div> : '';

    return (
        <form id={formId} encType="multipart/form-data" className={cl} onSubmit={handleSubmit}>
            {ok}
            {error}
            <Field name="promokod" type="text" component={InputField} label="Промокод" maxLength="9" />
            <Field name="fio" type="text" component={InputField} label="Ф.И.О." />
            <Field name="phone" type="phone" component={InputField} label="Контактный телефон" />
            <Field name="email" type="text" component={InputField} label="E-mail" />
            <Field name="file1" type="image" component={InputField} label="Прикрепите фотографию или скан чека" />
            <Field name="confirm1" type="checkbox" component={InputField} label="Подтверждаю согласие на обработку персональных данных и согласие" />
            <Field name="confirm2" type="checkbox" component={InputField} label="Подтверждаю согласие на получение рекламных и информационных сообщений от ТМ «ПРИНТО»" />

            <div className="form-group--buttons">
                <button className="btn btn-warning btn-lg" type="submit" disabled={submitting}>Зарегистрировать промокод</button>
            </div>
        </form>

    );
}