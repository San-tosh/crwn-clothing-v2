import {initializeApp} from "firebase/app";
import {
    getAuth,signInWithRedirect,signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    }
    from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'

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


export const  addCollectionAndDocuments =  async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey); //get collection from db by key
    const batch = writeBatch(db); //get batch instance and we can write delete and fire at once
    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef, object)
    })
    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories'); // directories key and get collection instance
    const q = query(collectionRef); // get query object

    const querySnapshot = await getDocs(q); //asynchronous function to get docs from query i.e snapshot is actual data
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=> {
    //    const {title, items} = docSnapshot.data();
    //    acc[title.toLowerCase()] = items;
    //    return acc;
    // },{})
    //
    // return categoryMap;
}

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

export const signOutUser = async () => await signOut(auth);

// call back parameter is called whenever the auth changed
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, (callback));

export const getCurrentUser = () => { // promisify version if user auth exist or not //if exist pass to get snapshot
    return new Promise((resolve,reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => { //we resolve and unsubscribe the listener when we get the value anyway
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}