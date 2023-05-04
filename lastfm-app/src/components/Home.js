  import React, {useState, useEffect} from 'react'
  import TextField from "@mui/material/TextField";
  import IconButton from "@mui/material/IconButton";
  import SearchIcon from "@mui/icons-material/Search";
  import axios from "axios";
  import ProfileURL from "./UserProfileUrl";
  import UserCard from "./UserCard";

  export default function Home() {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);

    const ROOT_API_USER = "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=";
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    function search() {
      axios.get(`${ROOT_API_USER}${username}api_key=${API_KEY}&format=json`)
            .then((response) => {
              setUserData(response.data);
            });
    }

    function onChange(e) {
      setUsername(e.target.value);
    }

    useEffect(() => {
      if (userData) {
        const ROOT_API_ARTIST = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${userData.user.name}&=api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=3`;
        axios.get(ROOT_API_ARTIST)
              .then((response) => console.log(response))
      }
    }, [userData])
    return (
      <div>
        <section className="profileAndSearch">
          <ProfileURL/>
          <TextField
              id="outlined-basic"
              variant="outlined"
              label="Last.fm username"
              value={username}
              onChange={onChange}
          />
          <IconButton
            color="secondary"
            onClick={search}>
              <SearchIcon/>
            </IconButton>
        </section>
        {userData && (<UserCard userData={userData}/>)}
      </div>
    )
  }