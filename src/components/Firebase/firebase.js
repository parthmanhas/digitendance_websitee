import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyA2tPKcoAkn7jEafTBUgQjXlq56Mgyl1Bo",
    authDomain: "digitendance-ae1f3.firebaseapp.com",
    databaseURL: "https://digitendance-ae1f3.firebaseio.com",
    projectId: "digitendance-ae1f3",
    storageBucket: "digitendance-ae1f3.appspot.com",
    messagingSenderId: "407327706668",
    appId: "1:407327706668:web:12dce55cdde23493860b89"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(email, password)
                .then(() => resolve())
                .catch(err => reject(err));
        })
    }

    doSignInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(email, password)
                .then(() => resolve())
                .catch(err => reject(err));
        })
    }

    doSignOut = () => {
        return new Promise((resolve, reject) => {
            this.auth.signOut()
                .then(() => resolve())
                .catch(err => reject(err));
        })
    }


}
export default Firebase;