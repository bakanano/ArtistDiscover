import React from 'react'
import "../styles.css";

export default function userProfileUrl({username}) {
  return (
    <div className="profileURL">http://www.last.fm/user/{username}</div>
  )
}
