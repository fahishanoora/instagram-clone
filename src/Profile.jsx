import React from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = React.useState(null);

  const [followers , setFollowers] = React.useState([]);

  const [Unfollowed, setUnfollowed] = React.useState(0);

  React.useEffect(() => {
    axios.get("http://localhost:3000/profiles")
    .then((res) => setProfile(res.data[0]))
    .catch((err) => console.log("ERROR:", err));

      axios.get("http://localhost:3000/followers")
      .then(data => setFollowers(data.data))
      .catch(err => console.log("ERROR:", err));
  }, []);

  function handleOnChange(e){
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleUpdate=async () => {
    axios.put(`http://localhost:3000/profiles/${profile.id}`, profile)
    .then(console.log ("Profile updated"))
    .catch((err) => console.log("ERROR:", err));

  }

  const handleUnfollow = (id) => {
    axios.delete(`http://localhost:3000/followers/${id}`)
      .then(() => {
        setFollowers(prev => prev.filter(f => f.id !== id));
      })
      .catch(err => console.log(err));
  };


  return (
    <div className="m-5">
      {profile ? (
        <div>
          <img src={profile.profile_pic} alt="Profile" className="profile rounded-circle"/>
          <h4>{profile.username}</h4>


          <input type="text"
            value={profile.username}
            name="username"
            className="form-control my-4"
            onChange={handleOnChange}
          />

          <input type="text" 
            name="profile_pic"
            value={profile.profile_pic}
            className="form-control"
            onChange={handleOnChange}
          />

          <button className="btn btn-primary mt-3"
            onClick={handleUpdate}>
            Update Profile
          </button>


        </div>
      ) : (
        <div>Loading...</div>
      )}


      <div>
    {followers.length > 0 ? (
      followers.map((follower) => (
        <div key={follower.id} className="d-flex align-items-center my-3">
          <img
            src={follower.follower_pic}
            alt={follower.username}
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <span>{follower.username}</span>
          <p className="ms-auto text-primary" onClick={() => handleUnfollow(follower.id)}>Unfollow</p>
        </div>
      ))
    ) : (
      <div>Loading followers...</div>
    )}
  </div>

    </div>
  );
}

export default Profile;
