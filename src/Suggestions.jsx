import axios from 'axios';
import React, { use, useEffect } from 'react'
import { useState } from 'react';

function Suggestions() {
  const [profile , setProfile] = useState(null);
  const [suggestions , setSuggestions] = useState([]);
  const [following, setFollowing] = useState([]);


  useEffect(() => {
  fetch("http://localhost:3000/profiles")
    .then(res => res.json())
    .then(data => setProfile(data[0])) 
    .catch(err => console.log(err));

  fetch("http://localhost:3000/suggestions")
    .then(res => res.json())
    .then(data => setSuggestions(data))
    .catch(err => console.log(err));
}, []);
  useEffect(() => {

    fetch('http://localhost:3000/suggestions')
    .then(data => data.json())
    .then(data => setSuggestions(data))
    .catch(err => console.log('ERROR:', err));
  }, []);

  const handlefollow = async (id,username, profile_pic) => {
    axios.post('http://localhost:3000/followers', {
      id,
      username,
      follower_pic: profile_pic
    })
    .then(() => alert(`You followed ${username}`))
    .catch(err => console.log('ERROR:', err));

  }

  return (
    <div> 
      <div className='suggestion w-75'>
        <div className='d-flex'>
            <img className = "dp rounded-circle" src={profile?.profile_pic} alt={profile?.username} />
            <h5>{profile?.username}</h5>
            <p className='ms-auto text-primary'>switch</p>
        </div>
        <div className='d-flex'>
          <p>Suggested for you</p>
          <b className='ms-auto'>See All</b>
        </div>

         {suggestions.length > 0 ? ( 
    <div > {suggestions.map((suggestion) => (
     <div  key={suggestion.id}> 
        <div className='d-flex'>
          <img className = "dp rounded-circle" src={suggestion.profile_pic} alt={suggestion.username} />
          <h5>{suggestion.username}</h5>
          <p
            className="ms-auto text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handlefollow(suggestion.id, suggestion.username, suggestion.profile_pic);
              setFollowing([...following, suggestion.id]);
            }}>
            {following.includes(suggestion.id) ? "Following" : "Follow"}
          </p>

          
        </div>
        
      </div> 
      ))} </div>
     ):( <div>Loading...</div> )} 
      </div>
    </div>
  )
}

export default Suggestions