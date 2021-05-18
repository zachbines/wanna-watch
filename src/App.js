import { useEffect, useState } from 'react';
import './styles/App.css';
import firebase from './firebase.js';
// import WatchList from './WatchList.js';
import UserCards from './UserListCard.js';
import TvShowInput from './TvShowInput.js';
import { WatchList } from './TvShowInput.js';



// // how are you appending the username to your page, given that we don't use traditional vanilla JS DOM methods in React? (Perhaps you can use state here again? 
// If username is true, show an element with that value; if not, show nothing or "Create your watchlist" prompt

// what is the data structure for the showInput state ? users will be adding up to 5 shows, correct ? How are these 5 shows being saved - AKA structured - within state so you can:
// a) easily render them within the ListItems component
// b) eventually pass them into firebase if the user decides to save their list

// remember to "control" all your inputs (i.e.add an onChange event and tie their values to state)

// how will you structure the username PLUS the list of TV shows so you can pass both data points to Firebase in a single data structure (which can then be easily accessed once you have to render all the submitted "Watch lists" from all users to the page ?)

// do you need a method which will query Firebase every time a new user loads your app to load previously saved lists ? if so, when / how will this method be called (is requesting data from Firebase once all components have loaded, perhaps, a side effect ?)

// storing a reference to the database
const dbRef = firebase.database().ref('/users');

function App() {

  // state for userName
  const [userName, setUserName] = useState(false);
  //state for whether the user is logged in or not
  const [loggedIn, setLoggedIn] = useState(false);
  // state for the array of shows
  const [shows, setShows] = useState([]);
  // should ne the state of the dbData
  const [dbData, setDbData] = useState([]);
  // state for the users choice input
  const [showInput, setShowInput] = useState('');
  //state for the done button
  const [done, setDone] = useState(false);
  console.log(done);
  // when user "logs in" the database will be queried to check for that 

  useEffect(
    () => {
      dbRef.on('value', (snapshot) => {
        const dbDataArray = [];
        const data = snapshot.val();
        console.log(data);
        if (data !== null || data !== undefined) {
          for (let key in data) {
            console.log(`working with userKey ${key}`)
            const { userName, shows } = data[key];
            // loop through database go into every object and extract key values
            let userObj = { name: userName, shows: shows, userKey: key };
            dbDataArray.push(userObj);
            console.log(userObj);
          }
          setDbData(dbDataArray);
        }
        console.log("data from database", dbDataArray);
      });
    },
    []
  )

  const [entries, setEntries] = useState(0);

  // useEffect(
  //   () => {
  //     if (entries === 5 ) {

  //     }
  //   }
  // )

  const handleRemoveItem = (i) => {
    const newList = shows.filter((x, index) => index !== i)
    setShows(newList);
    setEntries(entries - 1);
  }

  const deleteCard = (card) => {
    dbRef.child(card).remove();
  }

  //USER CHOICE INPUT HANDLERS ------------- 
  // user show choice change handler
  const handleNewChoice = (event) => {
    let currentChoice = event.target.value;
    setShowInput(currentChoice);
    // console.log(currentChoice);
  }
  // everytime the add button is clicked:
  //  setShows is updated
  const handleAddClick = () => {

    // update shows array 
    const newShows = shows.concat(showInput);
    setShows(newShows);
    setEntries(entries + 1);
    console.log(newShows);
    setShowInput('')
  }

  // done button handler
  const handleDoneClick = (event) => {
    event.preventDefault();
    // console.log(userProfile);
    dbRef.push({ userName, shows });
    setDone(true);
    setLoggedIn(false);
    // this give users/jdhfdkajaj/shows+userName as siblings
  }

  // USERNAME CHANGE/LOGIN CLICK HANDLERS -------
  // username change handler
  const handleNameChange = (event) => {
    let currentUser = event.target.value;
    setUserName(currentUser);
    // console.log(currentUser);
  }

  // login button handler
  const handleLoginClick = () => {
    setDone(false);
    setLoggedIn(true);
    console.log(userName);
    // handle the name appending to the page
  }

  return (
    <div className="App">
      <div className="wrapper ">
        <h1>wannaWatch</h1>

        {!loggedIn ?
          <form action="submit" className="user-login" onSubmit={handleLoginClick}>
            <label htmlFor="username" className="sr-only">What's your name?</label>
            {/* put onChange, and value in input
        onChange is a function which sets the userInput name,
        value={userName} */}
            <input type="text" id="username" placeholder="Type your name here" onChange={handleNameChange} required />
            {/* onCLick = function which sets the state of Login to true. this renders the user-choice input on the screen and hides this form */}
            <button className="button login" >Login</button>
          </form> : ""}

        {/* TvShowInput.js  make into new componet, 
      maybe include WatchList in that component as well */}
        {loggedIn && <TvShowInput 
          userChoice={showInput}
          entries={entries}
          handleNewChoice={handleNewChoice}
          add={handleAddClick}
        /> }

        {loggedIn && <WatchList 
          entries={entries}
          userName={userName}
          showsList={shows}
          handleRemoveItem={handleRemoveItem}
          handleDoneClick={handleDoneClick}
        />}
        
        
        {/* user Card */}
        <UserCards dbData={dbData} deleteCard={deleteCard} />
      </div>
    </div>
  );
}

export default App;
