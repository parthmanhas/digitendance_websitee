import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FirebaseContext from './Firebase/firebaseContext';
import { useHistory } from 'react-router-dom';

const SignedInLinks = (props) => {

    const history = useHistory();

    const [signingOut, setSigningOut] = useState(false);

    const handleSignOut = (firebase) => (e) =>{
        setSigningOut(true);
        firebase.doSignOut()
        .then(() => {
            props.setLoggedIn(false);
            history.push('/signin');
            setSigningOut(false);

        })
        .catch(err => {
            alert(err.message);
            setSigningOut(false);
        });
    }

    return (
        <FirebaseContext.Consumer>
            {firebase =>
                <ul className='right'>
                    <li><NavLink to='/allClasses'>Classes</NavLink></li>
                    <li><NavLink to='/allLectures'>All Lectures</NavLink></li>
                    <li><NavLink to='/allQuiz'>All Quiz</NavLink></li>
                    <li><NavLink to='/alltest'>All Test</NavLink></li>
                    <li><NavLink to='/allworkshop'>All Workshop</NavLink></li>
                    <li><button className='btn' style={{ backgroundColor:'#ef5350' }} onClick={handleSignOut(firebase)}>Sign Out</button></li>
                </ul>
            }
        </FirebaseContext.Consumer>

    );
}

export default SignedInLinks;