import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase';
import CSVReader from 'react-csv-reader'

const Test = (props) => {

    const history = useHistory();
    const [students, setStudents] = useState();

    const location = useLocation();
    const username = firebase.auth().currentUser.email.split('@')[0];

    const [uploadingData, setuploadingData] = useState(false);
    const [className, setClassName] = useState();
    const [data, setData] = useState();

    const handleFileInput = (data, fileInfo) => {
        setData(data);
        //array of arrays(2)
        console.log(data);

    }

    const handleUpload = (e) => {
        setuploadingData(true);
        e.preventDefault();
        if (className == undefined) {
            setuploadingData(false);
            alert('Please enter class Name');
            return;
        }
        if (data == undefined) {
            setuploadingData(false);
            alert('Please choose a file to upload');
            return;
        }
        let toUpload = {};
        toUpload[className] = {};
        data.forEach(student => {
            //student[0] = name
            //student[1] = registration number
            console.log(student);
            let name = student[0];
            let regNum = student[1];
            if (name !== 'name' && regNum !== 'regNo')
                toUpload[className][regNum] = { name: name, attendanceMarked: false, qrCode: 'not-set' };

        });
        // console.log(toUpload);
        if (toUpload)
            firebase.database().ref(`${username}/allClasses`).update(toUpload)
                .then(() => {
                    setuploadingData(false);
                    alert('Class Added Successfully!');

                })
                .catch(err => {
                    setuploadingData(false);
                    alert(err.message);

                });
    }

    return (
        <div className='container center-align'>
            <div>
                <h5 style={{ paddingTop: '5%' }}>Add a class</h5>
            </div>
            {
                uploadingData
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
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="class_name" type="text" class="validate" onChange={e => setClassName(e.target.value)} />
                            <label for="class_name">Class Name</label>
                        </div>
                    </div>

                    <CSVReader
                        onFileLoaded={handleFileInput}
                    />


                    <div style={{ padding: '3%' }}>
                        <button className='btn purple indigo lighten-1' disabled={uploadingData} onClick={handleUpload}>
                            Upload
                            </button>
                    </div>

                    {/* <input type="file" name="Upload" id="Upload" style={{ backgroundColor: 'yellow' }}/> */}
                </form>
            </div>
            <div style={{ padding: '3%' }}><button className='btn teal darken-2' onClick={() => history.goBack()}>Back</button></div>
        </div>
    );

}

export default Test;