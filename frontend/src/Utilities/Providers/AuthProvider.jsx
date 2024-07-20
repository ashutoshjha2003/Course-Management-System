import React, { createContext, useEffect, useState } from 'react'
import { app } from '../../Config/firebase.init'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState('')
    const auth = getAuth(app);

    // Signup new user
    const signUp = async (email, password) => {
        try{
            setLoader(true)
            return await createUserWithEmailAndPassword(auth, email, password)
        }catch(error) {
            setError(error.code)
            throw error
        }
    }

    // Login existing user
    const login = async (email, password) => {
        try{
            setLoader(true)
            return await signInWithEmailAndPassword(auth, email, password)
        }catch(error) {
            setError(error.code)
            throw error
        }
    }

    // Logout user
    const logout = async () => {
        try {
            return await signOut(auth)
        }catch(error){
            setError(error.code)
            throw error
        }
    }

    // Update user profile
    const updateUser = async (name, photo) => {
        try{
            await updateProfile(auth.currentUser, {
                displayName: name, 
                photoURL: photo
            })
            setUser(auth.currentUser)
        }catch(error){
            setError(error.code)
            throw error
        }
    }

    // signin using Google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
        try{
            setLoader(true)
           return await signInWithPopup(auth, googleProvider)
        }catch(error){
            setError(error.code)
            throw error
        }
    }

    // Observer for users
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
            if(user){
                axios.post('http://localhost:5000/api/set-token', {email: user.email, name: user.displayName})
                .then((data) => {
                    if(data.data.token) {
                        localStorage.setItem('token', data.data.token)
                        setLoader(false)
                    }
                })
            }else {
                localStorage.removeItem('token')
                setLoader(false)
            }
        })

        return () => unsubscribe()
    },[])

    const contextvalue = {user, signUp, login, logout, updateUser, googleLogin, error, setError, loader, setLoader}
  return (
    <AuthContext.Provider value={contextvalue}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider