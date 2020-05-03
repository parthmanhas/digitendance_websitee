import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase';

const SignUp = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [signingUp, setSigningUp] = useState(false);

    const history = useHistory();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (!firstName) {
            alert('Please Enter First Name');
            return;
        }
        if (!lastName) {
            alert('Please Enter Last Name');
            return;
        }
        setSigningUp(true);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('Sign up Successful, Please Log in');
                setSigningUp(false);
                history.push('/signin');
            })
            .catch((err) => {
                alert(err.message);
                setSigningUp(false);
            });
    }

    return (
        <div className='container'>
            <form onSubmit={handleOnSubmit} className='white'>
                <h5 className='grey-text text-darken-3'>Sign Up</h5>
                <div className='input-field'>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" onChange={event => setFirstName(event.target.value)} />
                </div>
                <div className='input-field'>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" onChange={event => setLastName(event.target.value)} />
                </div>
                <div className='input-field'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={event => setEmail(event.target.value)} />
                </div>
                <div className='input-field'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={event => setPassword(event.target.value)} />
                </div>
                <div className='input-field'>
                    <button className='btn btn-primary' disabled={signingUp}>Sign Up</button>
                </div>
            </form>
        </div>
    );

}

export default SignUp;