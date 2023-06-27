import React from "react";
import {useStyles} from "../styles";

export default function TopThreeSection({topThreeArtists}) {
    const classes = useStyles();
    return (
        <section className={classes.topThreeSection}>
          <p><b>Top 3 LastFM artists</b></p>
            <ul>
              {topThreeArtists.map((artist) => (<li className="topList" key={artist}><b><a href={`https://www.last.fm/music/${encodeURIComponent(artist)}`} target="_blank" rel="noopener noreferrer">{artist}</a></b></li>))}
            </ul>
        </section>
    );
}
