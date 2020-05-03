import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase';

const AllQuiz = () => {

    const [dates, setDates] = useState();

    const history = useHistory();

    const username = firebase.auth().currentUser.email.split('@')[0];

    const [loadingData, setLoadingData] = useState(true);

    const getData = () => {
        firebase.database().ref(`${username}/quiz`).once('value')
            .then((snap) => {
                // console.log(snap.val());
                const data = snap.val();
                if (data == null){
                    setLoadingData(false);
                    return;
                }
                let temp = [];
                Object.entries(data).forEach(([date, value]) => {
                    temp.push(date);
                })
                if (temp.length > 0) {
                    setDates(temp);
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
                <h5 style={{ paddingTop: '5%' }}>Select a Date</h5>
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
                        dates
                            ?
                            dates.map(date =>
                                <li style={{ padding: 10 }}>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => history.push({ pathname: '/quizDates', state: { date: date } })}
                                        style={{ width: '100%' }}
                                    >
                                        {date}
                                    </button>
                                </li>)
                            :
                            loadingData ? '' : 'No Data Available'
                    }
                </ul>
            </div>
            <div style={{ padding: '3%' }}><button className='btn teal darken-2' onClick={() => history.goBack()}>Back</button></div>
        </div>
    );

}

export default AllQuiz;