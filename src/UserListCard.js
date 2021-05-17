import './styles/App.css';

const UserListCard = ({ dbData }) => {
  console.log(dbData);

 // printing from database 
  return (
    <div className="stored-lists">
      <ul>
        {
          dbData.map((user) => {
            console.log(user)
            return (
              <div key={user.userKey} className="user-list-card">
                <h3>{user.name}'s Watch List</h3>
                <ul>
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
      </ul>
    </div>
  )

}

export default UserListCard;