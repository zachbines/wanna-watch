import '../styles/App.css'
import {useState} from 'react';

const TvShowInput = ({entries, addShow }) => {
  // state for the users choice input
  const [showInput, setShowInput] = useState('');
  
  const handleNewChoice = (event) => {
    const currentChoice = event.target.value;
    setShowInput(currentChoice);
  }

  return (
    <section className="user-input">
      <div className="input-container">
        <label htmlFor="user-choice" className="sr-only">What shows would you like to watch?</label>
        <input
          className={entries === 5 ? "center" : ''}
          type="text"
          id="user-choice"
          value={showInput}
          onChange={handleNewChoice}
          placeholder={entries === 5 ? "Click SAVE to save your list" : "whatcha wanna watch?"}
          disabled={entries === 5 ? true : false}
        />
        {entries < 5 && <button className='button add' onClick={() => {addShow(showInput, setShowInput)}}>add</button>}
      </div>
    </section>
  )
}

export const WatchList = (props) => {
  const { 
    userName, 
    removeShow, 
    saveUserList, 
    showsList, 
    entries } = props;

  return (
    <section className="watch-list-container">
      { userName.lastIndexOf('s') !== (userName.length - 1) ?
        <h2>{userName}'s Watch List</h2>
        : <h2>{userName}' Watch List</h2>
      }
      <ul className="watch-list"> 
        {
          showsList.map((show, i) => {
            return (
              <li key={i} className="list-item-container">

                <div>{show}
                  <button className="remove" onClick={() => { removeShow(i) }}>remove</button>
            
                </div>
              </li>
            )
          })
        }
      </ul>
      {entries > 0 && <button className="button save" onClick={saveUserList}><span>SAVE</span></button>}
    </section> 
  )
}

export default TvShowInput;
