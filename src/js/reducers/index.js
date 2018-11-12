import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import formStatus from './formStatus'

export default combineReducers({
    formStatus: formStatus,
    form: formReducer
})
