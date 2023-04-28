import React from 'react'
import SearchBar from "./SearchBar";
import ProfileURL from "./userProfileUrl";

export default function Home() {
  return (
    <div className="container">
        <section className="searchSection">
          <ProfileURL/>
          <SearchBar/>
        </section>
        <section className="userStats"></section>
    </div>
  )
}
