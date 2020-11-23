import './App.css';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

firebase.initializeApp({
  apiKey: "AIzaSyBeIEuXqz3xjoKCQ1P955UpcDwtEsS8ZIg",
  authDomain: "fir-demmo-1a9c1.firebaseapp.com",
  databaseURL: "https://fir-demmo-1a9c1.firebaseio.com",
  projectId: "fir-demmo-1a9c1",
  storageBucket: "fir-demmo-1a9c1.appspot.com",
  messagingSenderId: "790470392439",
  appId: "1:790470392439:web:855c831a278a4a3d616472",
  measurementId: "G-7GHWY2HPBX"
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      {user ?
        <Profile user={user} firebase={firebase}/> :
        <div className="signsContainer">
          <SignIn />
          <SignUp firebase={firebase}/>
        </div>
      }
    </div>
  );
}

export default App;
