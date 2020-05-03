import React from 'react';
import * as firebase from 'firebase';

const DashBoard = () => {

    const username = firebase.auth().currentUser.email;

    return (
        <div className='container center-align' style={{ paddingTop: '10%' }}>
            <h3>Welcome {username}</h3>
        </div>
    );
}

export default DashBoard;