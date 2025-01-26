import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut 
} from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Account created successfully!');
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Signed in successfully!');
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            toast.success('Signed out successfully!');
        } catch (error) {
            toast.error('Error signing out');
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        signUp,
        signIn,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
} 