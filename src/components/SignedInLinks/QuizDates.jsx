import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase';

const QuizDates = (props) => {

    const [quizez, setQuizez] = useState();

    const history = useHistory();
    const location = useLocation();

    const date = location.state.date;

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
                Object.entries(data[date]).forEach(([quiz, value]) => {
                    temp.push(quiz);
                })
                setQuizez(temp);
                setLoadingData(false);
            })
            .catch(err => {
                alert(err.message);
                setLoadingData(false);
            })
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='container center-align'>
            <div>
                <h5 style={{ paddingTop: '5%' }}>Select a Quiz</h5>
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
                        quizez
                            ?
                            quizez.map(quiz =>
                                <li style={{ padding: 10 }}>
                                    <button style={{ width: '100%' }} className='btn btn-primary' onClick={() => history.push({ pathname: '/quizAttendance', state: { quiz: quiz, date: date } })}>
                                        {quiz}
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

export default QuizDates;