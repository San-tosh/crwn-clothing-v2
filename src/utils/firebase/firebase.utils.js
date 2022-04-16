import {initializeApp} from "firebase/app";
import {getAuth,signWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
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
const firebaseApp = initializeApp(firebaseConfig);
// to intialize firebase database instance

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signWithGooglePopup = ()=> signInWithPopup(auth,provider)

export const db = getFirestore(); //instantiated firestore database

export const createUserDocumentFromAuth = async (userAuth) =>{
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
                createdAt
            })
        } catch (e) {
            console.log('error creating the user', e.message)
        }
    }
    return userDocRef;
}