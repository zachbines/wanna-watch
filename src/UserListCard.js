import './styles/App.css';
import { useState } from 'react';

const UserListCard = ({ dbData, database }) => {
  // console.log(dbData);
  const deleteCard = (card) => {
      database.child(card).remove();
      
  }
 // printing from database 
  return (
    <ul className="stored-lists">
        {
          dbData.map((user) => {

            return (
              <li key={user.userKey} 
                className="user-list-card fade-in">
                <div 
                className="delete" 
                onClick={() => {deleteCard(user.userKey)}}
                >x</div>
                <h3>{user.name}'s Watch List</h3>
                <ul className="user-list">
                  {
                  user.shows.map((show, i) => {

                    return <li key={i}>{show}</li>
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