import React, { useState } from 'react';
// import * as firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import FirebaseContext from './Firebase/firebaseContext';

const SignIn = (props) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loggingIn, setLoggingIn] = useState(false);

    const history = useHistory();

    // const { changeLoginState } = props;

    const handleOnSubmit = (firebase) => (e) => {

        e.preventDefault();
        setLoggingIn(true);
        firebase.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setLoggingIn(false);
                props.setLoggedIn(true);
                history.push('/dashboard');
            })
            .catch(err => {
                alert(err.message);
                props.setLoggedIn(false);
                setLoggingIn(false);
            })
    }

    return (
        <FirebaseContext.Consumer>
            {firebase => {
                return (

                    <div className='container'>
                        <form onSubmit={handleOnSubmit(firebase)} className='white'>
                            <h5 className='grey-text text-darken-3'>Sign In</h5>
                            <div className='input-field'>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={event => setEmail(event.target.value)} />
                            </div>
                            <div className='input-field'>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={event => setPassword(event.target.value)} />
                            </div>
                            {
                                loggingIn
                                    ?
                                <div class="preloader-wrapper small active" style={{ marginTop: 20, marginLeft: 15 }}>
                                    <div class="spinner-layer spinner-blue-only">
                                        <div class="circle-clipper left">
                                            <div class="circle"></div>
                                        </div><div class="gap-patch">
                                            <div class="circle"></div>
                                        </div><div class="circle-clipper right">
                                            <div class="circle"></div>
                                        </div>
                                    </div>
                                </div>
                                    :
                                <div className='input-field'>
                                    <button className='btn' style={{ backgroundColor: '#43a047' }} >Login</button>
                                </div>
                            }

                        </form>
                    </div>
                )
            }}
        </FirebaseContext.Consumer>
    );

}

export default SignIn;