import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => {
        console.log('FETCHED DATA:', data);
        setPosts(data);
      })
      .catch(err => console.log('ERROR:', err));
  }, []);

 return ( 
    <div className='d-flex justify-content-center'> 
      {posts.length > 0 ? ( 
    <div > {posts.map((post) => (
     <div className="my-3" key={post.id}> 
        <div className='d-flex'>
          <img className = "dp rounded-circle" src={post.user.profile_pic} alt={post.user.username} />
          <h5>{post.user.username}</h5>
        </div>
        <div className='postss'>
          <img src={post.image} alt={post.caption} className="img-fluid rounded"/>
        </div>
        <div>
          <i className="bi bi-heart"></i>
          <i className="bi bi-chat"></i>
          <i className="bi bi-send"></i>
        </div>
        <div>
          <b>{post.likes} Likes</b>
        </div>
        <div>
          {post.caption}
        </div>
      </div> 
      ))} </div>
     ):( <div>Loading posts...</div> )} 
     </div> )
}

export default Posts;
//npx json-server --watch db.json --port 3000
