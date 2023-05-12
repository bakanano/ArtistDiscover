  import React, {useState, useEffect} from 'react';
  import {makeStyles} from "@material-ui/styles";
  import TextField from "@mui/material/TextField";
  import IconButton from "@mui/material/IconButton";
  import SearchIcon from "@mui/icons-material/Search";
  import axios from "axios";
  import ProfileURL from "./UserProfileUrl";
  import UserCard from "./UserCard";
  import Typography from "@mui/material/Typography";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D3D3D3"
      }
    },
    input: {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D3D3D3"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D3D3D3"
      }
    }
    }));

  export default function Home() {
    
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [topArtist, setTopArtist] = useState(null);
    const [error, setError] = useState(null);

    const ROOT_API_USER = "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=";
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    const classes = useStyles();

    function search() {
      axios.get(`${ROOT_API_USER}${username}&api_key=${API_KEY}&format=json`)
            .then((response) => {
              setUserData(response.data);
            })
            .catch((error) => {
              setError("Oops! Something went wrong. Please try again.");
            });
    }

    function onChange(e) {
      setUsername(e.target.value);
    }

    useEffect(() => {
      if (userData) {
        const ROOT_API_ARTIST = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${userData.user.name}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=3`;
        axios.get(ROOT_API_ARTIST)
              .then((response) => {
                setTopArtist(response.data.topartists);
              })
              .catch((error) => {
                setError("Oops! Something went wrong while fetching top artists. Please try again.");
              });
    }
    }, [userData]);

    useEffect(() => {
      if (topArtist) {
        const topThreeArtists = topArtist.artist.map((artist) => artist.name);
        topThreeArtists.map((artistName) => {
          axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=3`)
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.error(error);
                  setError("Something went wrong while fetching similar artists. Please try again.");
                });
        })
      }
    }, [topArtist])

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
              className={`${classes.root} ${classes.input}`}
              InputProps={{
                classes: {
                  root: classes.root,
                  input: classes.input,
                  shrink: classes.shrink
                }
              }}
          />
          <IconButton
            color="secondary"
            onClick={search}>
              <SearchIcon/>
            </IconButton>
        </section>
        <div className="error">
          {error}
        </div>
        {userData && (<UserCard userData={userData} topArtist={topArtist}/>)}
      </div>
    )
  }