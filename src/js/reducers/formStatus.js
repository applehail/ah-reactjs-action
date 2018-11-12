import { FormStatuses } from '../actions';

const formStatus = (state = FormStatuses.SHOW_FORM, action) => {

    //console.log(action.type);
    switch (action.type) {
        case 'SEND_FORM':
            return FormStatuses.SEND_FORM;
        case 'SENDED_OK':
            return FormStatuses.SENDED_OK;
        case 'SENDED_ERROR':
            return FormStatuses.SENDED_ERROR;
        default:
            return state
    }
}

export default formStatus;