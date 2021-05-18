
const TvShowInput = ({ userChoice, handleNewChoice, entries, add }) => {

  return (
    <div className="user-input">
      <label htmlFor="user-choice" className="sr-only">What shows would you like to watch?</label>
      <div className="input-container">
        <input
          className={entries === 5 && "center"}
          type="text"
          id="user-choice"
          value={userChoice}
          onChange={handleNewChoice}
          placeholder={entries === 5 ? "Click DONE to save your list" : "whatchaWannaWatch?"}
          disabled={entries === 5 ? true : false}
        />
        {entries < 5 && <button className='button add' onClick={add}>add</button>}
        {console.log(entries)}
      </div>
    </div>
  )
}

export const WatchList = (
  {userName, handleRemoveItem, handleDoneClick, showsList, entries}) => {
  console.log(entries);
  return (
    <div className="watch-list-container">
      <h2>{userName}'s Watch List</h2>
      <div className="watch-list">
        {
          showsList.map((show, i) => {
            return (
              <ul className="list-item-container">

                <li key={i}>{show}
                  <button className="remove" onClick={() => { handleRemoveItem(i) }}>remove</button>
                </li>
              </ul>
            )
          })
        }
      </div>
      {entries > 0 && <button className="button done" onClick={handleDoneClick}>DONE</button>}
    </div> 
  )
}

export default TvShowInput;
