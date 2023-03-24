import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export const registerUser = async (email, password, displayName) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName })
        console.log(auth.currentUser);
    }
    catch (err) {
        return err.message.replace('Firebase:', '')
    }

}
//najava
export const login = async (email, password) => {
    try {
        const userrCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userrCredential);
    }
    catch (err) {
        return err.message.replace('Firebase:', '')
    }
}

//prikazuvanje na username otkoga ke se najave
export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user)
        } else {
            setCurrentUser(null)
        }
    })
}

//odjavi se
export const logout = () => {
    signOut(auth);
}

//najava so google
export const signUpProvider = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
}

//forget password
export const forgotPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return 'Please check your mail box !'
    } catch (err) {
        return err.message.replace('Firebase:', '')
    }
}