import '../styles/App.css';

const UserListCard = ({ dbData, database }) => {
  // console.log(dbData);
  const deleteCard = (card) => {
      database.child(card).remove();
      
  }
 // printing all saved user cards from database 
  return (
    <ul className="stored-lists">
        {
          dbData.map((user) => {

            return (
              <li key={user.userKey} className="user-list-card fade-in">
                <button aria-label="Delete" className="delete" onClick={() => {deleteCard(user.userKey)}}>x</button>
                {/* if username ends with s, only add ' to the end */}
                { user.name.lastIndexOf('s') !== (user.name.length - 1) ? 
                <h3>{user.name}'s Watch List</h3> 
                : <h3>{user.name}' Watch List</h3>}
                <ul className="user-list">
                  {
                  user.shows.map((show, i) => {
                    return <li key={i}>{i + 1}. {show}</li>
                  })
                  }
                </ul>
              </li>
            )
          })       
        }
    </ul>
  )

}

export default UserListCard;