import React from 'react';
import ActiveContactForm from '../containers/ActiveContactForm';

const App = (props) => {

    const cl = 'app-container app-container--' + props.status;

    return (
        <div className={cl}>
            <ActiveContactForm />
        </div>
    );
}

export default App;