import { useEffect, useState } from 'react';
import './App.css';
import firebase from './firebase.js';
// import WatchList from './WatchList.js';



// // how are you appending the username to your page, given that we don't use traditional vanilla JS DOM methods in React? (Perhaps you can use state here again? If username is true or isn't empty - your choice what value you wish to check for - show an element with that value; if not, show nothing or "Create your watchlist" prompt

// what is the data structure for the showInput state ? users will be adding up to 5 shows, correct ? How are these 5 shows being saved - AKA structured - within state so you can:
    // a) easily render them within the ListItems component
    // b) eventually pass them into firebase if the user decides to save their list

// remember to "control" all your inputs (i.e.add an onChange event and tie their values to state)

// how will you structure the username PLUS the list of TV shows so you can pass both data points to Firebase in a single data structure (which can then be easily accessed once you have to render all the submitted "Watch lists" from all users to the page ?)

// do you need a method which will query Firebase every time a new user loads your app to load previously saved lists ? if so, when / how will this method be called (is requesting data from Firebase once all components have loaded, perhaps, a side effect ?)

// storing a reference to the database
const dbRef = firebase.database().ref('/users');

function App() {
  
  const [ shows, setShows ] = useState([]);
  const [ userName, setUserName ] = useState(false);
  const [ loggedIn, setLoggedIn ] = useState(false);




    // when user "logs in" the database will be queried to check for that name 
    // if the username exsits, show their picks and the ability to add to them, else, just show the app interface. 

  useEffect(
    () => {
      // setShows(['breaking bad', 'south park', 'threes company']);
      // everytime the add button is clicked:
        //  setShows is updated
        // 
      // const userWatchList = {
      //   user: 
      // };

      const newUser = firebase.database().ref();
      // searches the db for value changes
      newUser.on('value', (response) => {
        const data = response.val();
        console.log(data)
      })
      // console.log(newUser);
      // console.log(dbRef);
    }, 
    [] //<--- make this dependancy array depend on the add button
  )

  
  // on click of the ADD button
  // this must happen everytime the user inputs a new show into the search field 


  //this is me trying to query the database to see if the name exists
  useEffect(
    () => {
      dbRef.on('value', (response) => {
        const data = response.val();
        // console.log(data)
        for (let key in data) {
          if (userName === data[key].userName) {
            console.log(data[key].shows); // gives me the shows array

          } 
        }
      })
    },
    [loggedIn]
  )

  // this is me trying to  figure out how to retrieve the data from the database to put it on the page. 
  useEffect(
    () => {
      dbRef.on('value', (response) => {
        let pageArray = [];
        const data = response.val();
        // console.log(data)
        for (let key in data) {
          pageArray = data[key].shows;
          
        }
      })
    },
    []
  )
    
  const handleAddButton = (event) => {
    // event.preventDefault();
    // this will handle what the add button does:
      // store new show in database

    
  }

  const handleNameChange = (event) => {
    let currentUser = event.target.value;
    setUserName(currentUser);
    console.log(currentUser);
  }


  const handleInputChange = (event) => {
    let showChoice = event.target.value;

    setShows([])
  }


  const handleLogin = () => {
    setLoggedIn(true);
    // handle the name appending to the page
  }

  
  const handleClick = () => {  
    // console.log(userProfile);
    const userObject = firebase.database().ref('/users');
    userObject.push({ userName, shows });
    // as an object with an array, gives me obj { name: zach, ksn89jckjnj32knjn: [ tv shows ]} not ideal

  }

  return (
    <div className="App">
      <h1>wannaWatch</h1>

      { !loggedIn ? 
      <form action="submit" className="user-login">
        <label htmlFor="username" className="sr-only">What's your name?</label>
        {/* put onChange, and value in input
        onChange is a function which sets the userInput name,
        value={userName} */}
        <input type="text" id="username" placeholder="Type your name here" onChange={handleNameChange}/>
        {/* onCLick = function which sets the state of Login to true. this renders the user-choice input on the screen and hides this form */}
        <button className="button login" onClick={handleLogin}>Login</button>
      </form> : "" }

      <form>
        <label htmlFor="user-choice" className="sr-only">What shows would you like to watch?</label>
        <input type="text" id="user-choice" onChange={handleInputChange}/>
        <button className='button add' onClick={() => {handleAddButton()}}>ADD</button>
      </form>

      {/* WatchList.js */}
      <div>
        {loggedIn ? <h2>{userName}'s Watch List</h2> : ''}
        <ul>
          {/* list will append here as they add items */}
        </ul>
        <button className="button done" onClick={handleClick}>DONE</button>
      </div>
    </div>
  );
}

export default App;
