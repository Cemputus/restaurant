// // import { createStore, combineReducers, compose } from "redux";
// // import firebase from "firebase/app"; // Import only the "app" module from Firebase
// // import "firebase/firestore";
// // import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
// // import { reduxFirestore, firestoreReducer } from "redux-firestore";
// // import orderReducer from "./reducers/orderReducer";

// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyBb4E4X_VzbqjeCDZLDCbDgUCngzihuTr4",
// //   authDomain: "emmanuel-nsubuga.firebaseapp.com",
// //   projectId: "emmanuel-nsubuga",
// //   storageBucket: "emmanuel-nsubuga.appspot.com",
// //   messagingSenderId: "759743730886",
// //   appId: "1:759743730886:web:9e365577ea174929fc73c7",
// //   measurementId: "G-Y4SW7NGW38"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // // react-redux-firebase configuration
// // const rrfConfig = {
// //   userProfile: "users",
// //   useFirestoreForProfile: true
// // };

// // // Initialize Firestore
// // const firestore = firebase.firestore();
// // const settings = { timestampsInSnapshots: true };
// // firestore.settings(settings);

// // // Combine reducers
// // const rootReducer = combineReducers({
// //   firebase: firebaseReducer,
// //   firestore: firestoreReducer,
// //   orders: orderReducer
// // });

// // // Create initial state
// // const initialState = {};

// // // Create store
// // const store = createStore(
// //   rootReducer,
// //   initialState,
// //   compose(
// //     reactReduxFirebase(app, rrfConfig), // Use 'app' here instead of 'firebase'
// //     reduxFirestore(firebase)
// //   )
// // );

// // export default store;


// import { createStore, combineReducers, compose } from "redux";
// import { initializeApp } from "firebase/app"; // Import only the "app" module from Firebase
// import "firebase/firestore";
// import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
// import { reduxFirestore, firestoreReducer } from "redux-firestore";
// import orderReducer from "./reducers/orderReducer";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBb4E4X_VzbqjeCDZLDCbDgUCngzihuTr4",
//   authDomain: "emmanuel-nsubuga.firebaseapp.com",
//   projectId: "emmanuel-nsubuga",
//   storageBucket: "emmanuel-nsubuga.appspot.com",
//   messagingSenderId: "759743730886",
//   appId: "1:759743730886:web:9e365577ea174929fc73c7",
//   measurementId: "G-Y4SW7NGW38"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // react-redux-firebase configuration
// const rrfConfig = {
//   userProfile: "users",
//   useFirestoreForProfile: true
// };

// // Initialize Firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// // Combine reducers
// const rootReducer = combineReducers({
//   firebase: firebaseReducer,
//   firestore: firestoreReducer,
//   orders: orderReducer
// });

// // Create initial state
// const initialState = {};

// // Create store
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     reactReduxFirebase(app, rrfConfig),
//     reduxFirestore(app)
//   )
// );

// export default store;


import { createStore, combineReducers, compose } from "redux";
import { initializeApp } from "firebase/app"; // Import only the "app" module from Firebase
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import orderReducer from "./reducers/orderReducer";

// Explicitly import required modules from Firebase
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb4E4X_VzbqjeCDZLDCbDgUCngzihuTr4",
  authDomain: "emmanuel-nsubuga.firebaseapp.com",
  projectId: "emmanuel-nsubuga",
  storageBucket: "emmanuel-nsubuga.appspot.com",
  messagingSenderId: "759743730886",
  appId: "1:759743730886:web:9e365577ea174929fc73c7",
  measurementId: "G-Y4SW7NGW38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// react-redux-firebase configuration
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// Initialize Firestore
const firestore = getFirestore(app); // Use getFirestore function from Firebase

// Combine reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  orders: orderReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStore(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(app, rrfConfig),
    reduxFirestore(app)
  )
);

export default store;
