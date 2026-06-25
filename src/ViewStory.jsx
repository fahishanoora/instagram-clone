import React from 'react'
import { useParams , Link , useNavigate } from 'react-router-dom';
import { useEffect , useState } from 'react';


function ViewStory() {
    const { Id , tot } = useParams();

    const [story, setStory] = React.useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/story/${Id}`)
            .then(data => data.json())
            .then(data => {
                setStory(data);
            })
            .catch(err => console.log('ERROR:', err));
    }, [Id]);

    if (Id > tot || Id <= 0) {
        navigate('/');
    }


  return (
    <div>
        {story ? <div className='d-flex justify-content-center align-items-center'>
            <Link to={`http://localhost:5173/story/${Number(Id) - 1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
            <img className="vh-100" src={story.image} alt={story.image_alt} />
            <Link to={`http://localhost:5173/story/${Number(Id) + 1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
                </div> : <div>Loading...</div>
        }
    </div>
  )
}

export default ViewStory