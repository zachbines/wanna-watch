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
          placeholder={entries === 5 ? "Click DONE to save your list" : "whatchaWannaWatch?"}
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
    handleDoneClick, 
    showsList, 
    entries } = props;

  return (
    <section className="watch-list-container">
      <h2>{userName}'s Watch List</h2>
      <div className="watch-list">
        {
          showsList.map((show, i) => {
            return (
              <ul className="list-item-container">

                <li key={i}>{show}
                  <button className="remove" onClick={() => { removeShow(i) }}>remove</button>
            
                </li>
              </ul>
            )
          })
        }
      </div>
      {entries > 0 && <button className="button done" onClick={handleDoneClick}>DONE</button>}
    </section> 
  )
}

export default TvShowInput;
