import React from 'react'
import "../styles.css";

export default function UserProfileUrl({username}) {
  return (
    <div className="profileURL">http://www.last.fm/user/{username}</div>
  )
}
