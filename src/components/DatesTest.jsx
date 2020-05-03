import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase';

const AllLectures = () => {


    const [dates, setDates] = useState();

    // const username = firebase.auth().currentUser.email.split('@')[0];

    const [loadingData, setLoadingData] = useState(true);

    const history = useHistory();
    const getData = () => {
        firebase.database().ref(`teacher2/lecture`).once('value')
            .then((snap) => {
                console.log(snap.val());
                const data = snap.val();
                let temp = [];
                Object.entries(data).forEach(([date, value]) => {
                    temp.push(date);
                })
                if (temp.length > 0) {
                    setDates(temp);
                }
                console.log(temp);
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
        <div className='container center-align'> {/** */}
            <div>
                <h5 style={{ paddingTop: '5%' }}>Select a Date</h5>{/** */}
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
            <div className='container' style={{backgroundColor:'yellow'}}>{/** */}
                <ul className='container' style={{width: 'max-content', backgroundColor: 'red' }}>{/** */}
                    {
                        dates
                            ?
                            dates.map(date =>
                                <li style={{ padding: 10 }}>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => history.push({ pathname: '/lecturesDates', state: { date: date } })}
                                        style={{ width: '100%' }}
                                    >
                                        {date}
                                    </button>
                                </li>
                                )
                            :
                            loadingData ? '' : 'No Data Available'
                    }
                </ul>
            </div>
            <div style={{ padding: '3%' }}>{/** */}
                <button className='btn btn-primary' onClick={() => history.goBack()}>Back</button>
            </div>
        </div>
    );

}

export default AllLectures;