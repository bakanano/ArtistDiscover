  import React, {useState, useEffect} from 'react';

  import TextField from "@mui/material/TextField";
  import IconButton from "@mui/material/IconButton";
  import SearchIcon from "@mui/icons-material/Search";

  import axios from "axios";

  import ProfileURL from "./UserProfileUrl";
  import UserCard from "./UserCard";
  import TopThreeSection from './TopThree';

  import {useStyles} from "../styles";

  export default function Home() {
    
    const [username, setUsername] = useState("");
    const [recommendation, setRecommendation] = useState([]);
    const [userData, setUserData] = useState(null);
    const [topArtist, setTopArtist] = useState(null);
    const [error, setError] = useState(null);
    const [topThreeArtists, setTopThreeArtists] = useState([]);

    const ROOT_API_USER = "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=";
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    const classes = useStyles();

    function search() {
      setError(null);
      axios.get(`${ROOT_API_USER}${username}&api_key=${API_KEY}&format=json`)
            .then((response) => {
              setUserData(response.data);
            })
            .catch((error) => {
              setError("Oops! User not found. Please try again.");
            });
    }

    function onChange(e) {
      setUsername(e.target.value);
    }

    //Generating unique artist recommendations based on the user's top three artists and a list of similar artists obtained from the LastFM API.
    function generateRecommendations(topThree, recommendedArtists) {
      const artistRecs = [];

      topThree.map((artist) => {
        
        const uniqueRecommendations = recommendedArtists.filter(
          (recommendationArtist) => !topThree.includes(recommendationArtist)  && !artistRecs.includes(recommendationArtist)
        );

        const randomRecommendations = uniqueRecommendations.slice(0, 2);
        artistRecs.push(...randomRecommendations);
        });
        return artistRecs;
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
      try {
        if (topArtist) {
          const topThreeArtists = topArtist.artist.map((artist) => artist.name);
          setTopThreeArtists(topThreeArtists);
          topThreeArtists.map((artistName) => {
            axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=${process.env.REACT_APP_API_KEY}&format=json&`)
            .then((response) => {
                const similarArtist = response.data.similarartists.artist.map(i => i.name);
                const generatedRecommendations = generateRecommendations(topThreeArtists, similarArtist);
                setRecommendation(generatedRecommendations);
            })
          })
        }
      } catch (error) {
        setError("Something went wrong while fetching similar artists. Please try again.");
      }
    }, [topArtist])

    return (
      <div>
        <TopThreeSection topThreeArtists={topThreeArtists}/>
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
        {error && (
        <div className="error">
          {error}
        </div>
        )}
      {!error && userData && (
        <UserCard 
          userData={userData} 
          topArtist={topArtist} 
          recommendation={recommendation}
        />
      )}
      </div>
    )
  }
