  import React, {useState} from 'react'
  import TextField from "@mui/material/TextField";
  import fetchUser from "./fetchUser";

  export default function SearchBar() {
    const [username, setUsername] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
      fetchUser(username);
    };

    function onChange(e) {
      setUsername(e.target.value);
    }

    return (
      <div className="search">
        <form onSubmit={handleSubmit}>
          <TextField
              id="outlined-basic"
              variant="outlined"
              label="Last.fm username"
              value={username}
              onChange={onChange}
          />
        </form>
      </div>
    )
  }
