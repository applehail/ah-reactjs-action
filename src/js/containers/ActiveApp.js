import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

let ActiveApp = connect(
    store => ({
        status: store.formStatus
    })
)(App);

export default ActiveApp;