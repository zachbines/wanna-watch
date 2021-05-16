const UserListCard = (props) => {
  const { userName, showList} = props;


  // in here is where i need to extract the data from the database and print it to the card for persistence
  return (
    <div className="user-list-card">
      <h3>{userName}'s Watch List</h3>
      <ul>     
        {
        showList.map((show, i) => {
          return <li key={i}>{show}</li>
        })
        }

        <h2>hello!</h2>
      </ul>
    </div>
  )
}

export default UserListCard;