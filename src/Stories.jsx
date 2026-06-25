import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

function Stories() {
  const [stories , setStories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/story')
      .then(data => data.json())
      .then(data => {
        setStories(data);
      })
      .catch(err => console.log('ERROR:', err));
  }, []);

  return (
    <div className='story d-flex'>
      <div className='d-none'>
        {Stories.length}
      </div>
      {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story.id} className='mx-2' onClick={()=> {navigate(`/story/${story.id}/${story.tot}`)}}>
              <div className='border-gradient'>
                <img src={story.user.profile_pic} alt={story.user.name} className='story-dp rounded-circle' />
              </div>
              <p className='text-truncate' style={{width:"50px"}}>{story.user.username}</p>
            </div>
          ))):(
        <p>Loading...</p>
     )}
    </div>
  )
}

export default Stories