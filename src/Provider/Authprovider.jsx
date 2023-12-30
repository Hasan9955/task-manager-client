import { createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import PropTypes from 'prop-types'; 
import app from '../Firebase/Firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);  


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
            // if (currentUser) {
            //     const userInfo = { email: currentUser.email }
            //     axiosPublic.post('/jwt', userInfo)
            //         .then(res => {
            //             if (res.data.token) {
            //                 localStorage.setItem('access-token', res.data.token)
            //                 setLoading(false)
            //             }
            //         })
            // }
            // else {
            //     localStorage.removeItem('access-token')
            //     setLoading(false)
            // }
        })
        return () => {
            return unsubscribe()
        }
    }, [ ])
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSign = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUser = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        return signOut(auth)
    }



    const authInfo = {
        user,
        createUser,
        signInUser,
        loading,
        googleSign,
        updateUser,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object
}

export default AuthProvider;