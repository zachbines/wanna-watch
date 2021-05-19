import { useEffect, useState } from 'react';
import './styles/App.css';
import firebase from './firebase.js';
import Login from './Login.js';
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
  // state for the current array of shows being created
  const [shows, setShows] = useState([]);
  // data stored in the database
  const [dbData, setDbUserData] = useState([]);
  
  // state to track how many entries the user has inputted
  const [entries, setEntries] = useState(0);
  // when user "logs in" the database will be queried to check for that 

  useEffect(
    () => {
      dbRef.on('value', (snapshot) => {
        const newDbDataArray = [];
        const dbDataObject = snapshot.val();
        console.log(dbDataObject);
        if (dbDataObject !== null || dbDataObject !== undefined) {
          for (let key in dbDataObject) {
            const { userName, shows } = dbDataObject[key];
            // loop through database go into every object and extract key values
            let userObj = { name: userName, shows: shows, userKey: key };
            newDbDataArray.push(userObj);
          }
          setDbUserData(newDbDataArray);
        }
        console.log("data from database", newDbDataArray);
      });
    },
    []
  )

  const removeListItem = (i) => {
    const showsCopy = [...shows];
    const newList = showsCopy.filter((x, index) => index !== i)
    setShows(newList);
    setEntries(entries - 1);
  }

  // everytime the add button is clicked:
  //  setShows is updated
  const handleAddClick = (showInput, setShowInput) => {
    // update shows array 
    if (showInput) {
      const newShows = shows.concat(showInput);
      setShows(newShows);
      setEntries(entries + 1);
      console.log(newShows);
      setShowInput('');
    }
  }

  // done button handler
  const handleDoneClick = (event) => {
    event.preventDefault();
    // console.log(userProfile);
    dbRef.push({ userName, shows });
    setLoggedIn(false);
    setShows([]);
    setEntries(0);
  }

  // USERNAME CHANGE/LOGIN CLICK HANDLERS -------
  // username change handler
  const handleNameChange = (event) => {
    let currentUser = event.target.value;
    setUserName(currentUser);
    // console.log(currentUser);
  }

  // login button handler
  const handleLoginClick = (event) => {
    event.preventDefault();
    setLoggedIn(true);
    console.log(userName);
    // handle the name appending to the page
  }

  return (
    <div className="App">
      <div className="wrapper">
        <header >
          <h1 className="fade-in">wannaWatch</h1>
          {!loggedIn 
          ? <Login 
            handleLoginClick={handleLoginClick} 
            handleNameChange={handleNameChange}
          /> : ""}
        </header>

        {loggedIn && <TvShowInput 
          entries={entries}
          addShow={handleAddClick}
        /> }

        {loggedIn && <WatchList 
          entries={entries}
          userName={userName}
          showsList={shows}
          removeShow={removeListItem}
          handleDoneClick={handleDoneClick}
        />}
        
        <UserCards dbData={dbData} database={dbRef} />
      </div>
    </div>
  );
}

export default App;
