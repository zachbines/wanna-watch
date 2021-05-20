import '../styles/App.css';
import { useEffect, useState } from 'react';
import firebase from '../config/firebase.js';
import Login from './Login.js';
import UserCards from './UserListCard.js';
import TvShowInput from './TvShowInput.js';
import { WatchList } from './TvShowInput.js';


// remember to "control" all your inputs (i.e.add an onChange event and tie their values to state)

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
  const handleSaveClick = (event) => {
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

    // making sure username doesnt get too long
    if ( currentUser.length < 15) {
      setUserName(currentUser);
    }
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
      <div className="wrapper page-container">
        <header >
          <h1 className="fade-in">wanna<span>Watch</span></h1>
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
          saveUserList={handleSaveClick}
        />}
        
        <UserCards dbData={dbData} database={dbRef} />
      </div>
      <footer>
        <p>Created at <a href="http://junocollege.com">Juno</a> College</p>
        <p>Background image courtesy of <a href="https://wallpaperaccess.com/">https://wallpaperaccess.com/</a></p>
      </footer>
    </div>
  );
}

export default App;
