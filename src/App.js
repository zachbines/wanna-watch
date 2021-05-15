import './App.css';
import firebase from './firebase.js';

function App() {
  const dbRef = firebase.database().ref();
  console.log(firebase)
  return (
    <div className="App">
      <h1>wannaWatch</h1>
      <form action="submit" className="user-login">
        <label htmlFor="username" className="sr-only">What's your name?</label>
        <input type="text" id="username" placeholder="Type your name here" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
