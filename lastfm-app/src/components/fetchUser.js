import axios from "axios";

export default async function fetchUser(username) {

    const ROOT_API = "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=";
    const API_KEY = process.env.REACT_APP_API_KEY;
    const response = await axios.get(ROOT_API + username + "&api_key=" + API_KEY + "&format=json");
    const data = response.data;
    console.log(data);
    return data;
}
