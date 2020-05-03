import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase';

const WorkshopDates = (props) => {

    const [workshops, setworkshops] = useState();

    const history = useHistory();
    const location = useLocation();

    const date = location.state.date;

    const username = firebase.auth().currentUser.email.split('@')[0];

    const [loadingData, setLoadingData] = useState(true);

    const getData = () => {
        firebase.database().ref(`${username}/workshop`).once('value')
            .then((snap) => {
                console.log(snap.val());
                const data = snap.val();
                let temp = [];
                Object.entries(data[date]).forEach(([workshop, value]) => {
                    temp.push(workshop);
                })
                setworkshops(temp);
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
                <h5 style={{ paddingTop: '5%' }}>Select a workshop</h5>
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
                        workshops
                            ?
                            workshops.map(workshop =>
                                <li style={{ padding: 10 }}>
                                    <button  style={{ width: '100%' }} className='btn btn-primary' onClick={() => history.push({ pathname: '/workshopAttendance', state: {workshop: workshop, date: date } })}>
                                        {workshop}
                                    </button>
                                </li>)
                            :
                            loadingData ? '' : 'No Data Available'
                    }
                </ul>
            </div>
            <div style={{ padding: '3%' }}><button className='btn btn-primary' onClick={() => history.goBack()}>Back</button></div>
        </div>
    );

}

export default WorkshopDates;