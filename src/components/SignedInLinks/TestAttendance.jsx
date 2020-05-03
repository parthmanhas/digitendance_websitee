import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase';

const Lectures = (props) => {

    const [attendance, setAttendance] = useState();

    const history = useHistory();
    const location = useLocation();

    const date = location.state.date;
    const test = location.state.test;

    const username = firebase.auth().currentUser.email.split('@')[0];

    const [loadingData, setLoadingData] = useState(true);

    const getData = () => {
        firebase.database().ref(`${username}/test/${date}/${test}/attendance`).once('value')
            .then((snap) => {
                const data = snap.val();
                // console.log(Object.keys(data)[0]);
                if (Object.keys(data)[0].length === 9) {
                    //render class event list
                    let temp = [];
                    Object.entries(data).forEach(student => {
                        console.log(student);
                        if (student[0] !== 'init') {
                            let t = {};
                            t[student[0]] = student[1];
                            console.log(t);
                            temp.push(t);
                        }

                    })
                    setAttendance(temp);
                    setLoadingData(false);
                }
                else {
                    //render stand alone event list
                    let temp = [];
                    Object.entries(data).forEach(student => {
                        if (student[0] !== 'init')
                            temp.push(student[1]);
                    })
                    if (temp.length >= 1) {
                        setAttendance(temp);
                    }
                    setLoadingData(false);
                    // console.log(temp);
                }

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
                <h5 style={{ paddingTop: '5%' }}>View Attendance</h5>
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
                    {attendance
                        ?
                        attendance.map(obj => {
                            const key = Object.keys(obj)[0];
                            return (
                                <div class={obj[key]['attendanceMarked'] === true || obj[key]['attendanceMarked'] === 'true' ? "card green lighten-1" : "card blue lighten-4"}>
                                    <div class="card-content black-text">
                                        <li className='left-align' style={{width: 500, padding: 5, wordWrap: 'break-word' }}>
                                            <li className='card-title' >Reg No : {key}</li>
                                            <li>Name                : {obj[key]['name']}</li>
                                            <li>Comment             : {obj[key]['comment']}</li>
                                            <li>DeviceId            : {obj[key]['deviceId']}</li>
                                            <li>Manufacturer        : {obj[key]['manufacturer']}</li>
                                            <li>Time                : {obj[key]['time']}</li>
                                            <li>Attendance Marked   : {obj[key]['attendanceMarked'] === true || obj[key]['attendanceMarked'] === 'true' ? "true" : "false"}</li>
                                            {
                                                obj[key]['qrCode']
                                                    ?
                                                    <li>QR code assigned            : {obj[key]["qrCode"].trim()}</li>
                                                    :
                                                    <li>
                                                        Stand Alone Event
                                            </li>
                                            }
                                        </li>
                                    </div>
                                </div>
                            )
                        }) : loadingData ? '' : 'No Data Available'}
                </ul>
            </div>
            <div style={{ padding: '3%' }}><button className='btn teal darken-2' onClick={() => history.goBack()}>Back</button></div>
        </div>
    );

}

export default Lectures;