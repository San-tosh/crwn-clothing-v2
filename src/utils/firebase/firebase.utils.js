import {initializeApp} from "firebase/app";
import {
    getAuth,signInWithRedirect,signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
    }
    from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDbpf23-NHcnQnKRqpSu0ks8y7ZZnYcUAo",
    authDomain: "crown-clothing-db-af02f.firebaseapp.com",
    projectId: "crown-clothing-db-af02f",
    storageBucket: "crown-clothing-db-af02f.appspot.com",
    messagingSenderId: "24233793406",
    appId: "1:24233793406:web:480bd3abeded3b2d0dc52f"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
// to intialize firebase database instance

const googleProvider = new GoogleAuthProvider();
// we can use different provider for facebook and github

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signWithGooglePopup = ()=> signInWithPopup(auth,googleProvider)
export const signWithGoogleRedirect = ()=> signInWithRedirect(auth,googleProvider)

export const db = getFirestore(); //instantiated firestore database

export const createUserDocumentFromAuth = async (userAuth, additionalInformation= {}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db,"users",userAuth.uid) // parameters = database, collection, unique id identifier ( unique lik nikeairmax)
    // initially we do not have users collection it will create automatically
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef); // get reference from database document  ( it returns false if no document)
    // console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{ // data we are goin to set in that specific ref
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (e) {
            console.log('error creating the user', e.message)
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}