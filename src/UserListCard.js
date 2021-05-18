import './styles/App.css';
// import { }

const UserListCard = ({ dbData, deleteCard }) => {
  console.log(dbData);

 // printing from database 
  return (
    <div className="stored-lists">
        {
          dbData.map((user) => {
            console.log(user)
            return (
              <div key={user.userKey} className="user-list-card">
                <i className="delete" onClick={() => { deleteCard(user.userKey) }}>x</i>
                <h3>{user.name}'s Watch List</h3>
                <ul className="user-list">
                  {user.shows.map((show, i) => {
                    return <li key={i}>{show}</li>
                  })
                  }
                </ul>
              </div>
            )
          }
          )
        }
    </div>
  )

}

export default UserListCard;