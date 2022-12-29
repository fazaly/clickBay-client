import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

// Google Provider for sign in with google
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    // loading is set for better user interface
    const [loading, setLoading] = useState(true);

    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign In
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // State changed with onAuthState
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth,  (currentUser) => {
            // console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, []);

    // update user profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    // Forget Password
    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    // Sign Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Google SignIn
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const authInfo = {
        createUser,
        signIn,
        updateUserProfile,
        user,
        logOut,
        loading,
        setLoading,
        resetPassword,
        signInWithGoogle,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;