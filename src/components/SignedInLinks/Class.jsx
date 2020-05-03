import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase';
import FirebaseContext from '../Firebase/firebaseContext';

const Class = (props) => {

    const history = useHistory();
    const [students, setStudents] = useState();

    const username = firebase.auth().currentUser.email.split('@')[0];

    const location = useLocation();

    const [loadingData, setLoadingData] = useState(true);

    const className = location.state.className;
    const getData = () => {
        firebase.database().ref(`${username}/allClasses`).once('value')
            .then((snap) => {
                // console.log(snap.val());
                const data = snap.val();
                if (data == null){
                    setLoadingData(false);
                    return;
                }
                let temp = [];
                if (data[className]) {
                    Object.entries(data[className]).forEach(student => {
                        console.log(student[0]);
                        if (student[0] != 'init')
                            temp.push(student);
                    })
                    setStudents(temp);
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
                <h5 style={{ paddingTop: '5%' }}>All Class Students</h5>
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
                <ul className='container' style={{ width: '50%' }}>
                    {
                        students
                            ?
                            students.map(([k, v]) =>
                                <div class="card blue lighten-4">
                                    <div class="card-content black-text">
                                        <li className='left-align' style={{ padding: 5, wordWrap: "break-word" }}>
                                            <li className='card-title'>Reg No : {k}</li>
                                            <li>Name : {v['name']}</li>
                                            <li>Attendance Marked : {v['attendanceMarked'] ? 'true' : 'false'}</li>
                                            <li>QrCode Assigned : {v['qrCode']}</li>
                                        </li>
                                    </div>
                                </div>
                            )
                            :
                            loadingData ? '' : 'No Data Available'
                    }
                </ul>
            </div>
            <div style={{ padding: '3%' }}><button className='btn teal darken-2' onClick={() => history.goBack()}>Back</button></div>
        </div>
    );

}

export default Class;