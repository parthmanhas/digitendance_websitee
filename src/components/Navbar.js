import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SigneOutLinks';
import logo from '../logo_cropped.png';

const Navbar = (props) => {

    const { loggedIn } = props;
    const { setLoggedIn } = props;

    if (loggedIn) {
        return (
            <div>
                <nav className="nav-wrapper teal lighten-1">
                    <div className="container">
                        <Link to='/dashboard' className='brand-logo'>
                            <img class="responsive-img" src={logo}></img>
                        </Link>
                        <SignedInLinks setLoggedIn={setLoggedIn} />
                    </div>
                </nav>
            </div>
        )
    }
    else {
        return (
            <div>
                <nav className="nav-wrapper teal lighten-1">
                    <div className="container">
                        <Link to='/signin' className='brand-logo'>
                            <img class="responsive-img" src={logo}></img>
                        </Link>
                        <SignedOutLinks />
                    </div>

                </nav>
            </div>
        )
    }



}

export default Navbar;