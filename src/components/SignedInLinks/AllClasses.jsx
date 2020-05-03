import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase';

const AllClasses = () => {

    const [classes, setClasses] = useState();

    const username = firebase.auth().currentUser.email.split('@')[0];
    const [loadingData, setLoadingData] = useState(true);

    const history = useHistory();
    const getData = () => {
        firebase.database().ref(`${username}/allClasses`).once('value')
            .then((snap) => {
                console.log(snap.val());
                const data = snap.val();
                if (data == null){
                    setLoadingData(false);
                    return;
                }
                let temp = [];

                Object.entries(data).forEach(([className, value]) => {

                    if (className != 'init')
                        temp.push(className);
                })
                if (temp.length > 0) {
                    setClasses(temp);
                }
                setLoadingData(false);
            })
            .catch(err => {
                alert(err.message);
                setLoadingData(false);
            })
    }
    useEffect(() => {
        getData();
        // console.log(1);
    }, []);

    return (
        <div className='container center-align'>
            <div>
                <h5 style={{ paddingTop: '5%' }}>All Classes Added</h5>
            </div>
            {
                loadingData
                    ?
                    <div class="preloader-wrapper big active">
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
                    ''
            }
            <div className='container'>
                <ul className='container' style={{ width: 'max-content' }}>
                    {
                        classes
                            ?
                            classes.map(className =>
                                <li style={{ padding: 10 }}>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => history.push({ pathname: '/class', state: { className: className } })}
                                        style={{ width: '100%' }}
                                    >
                                        {className}
                                    </button>
                                </li>)
                            :
                            loadingData ? '' : 'No Class Added'
                    }
                    <li style={{ padding: 10 }}>
                        <button
                            className='btn purple indigo lighten-1'
                            onClick={() => history.push({ pathname: '/addClass' })}
                            style={{ width: '100%' }}
                        >
                            Add Class
                        </button>
                    </li>
                </ul>
            </div>
            <div style={{ padding: '3%' }}><button className='btn teal darken-2' onClick={() => history.goBack()}>Back</button></div>
        </div>
    );

}

export default AllClasses;