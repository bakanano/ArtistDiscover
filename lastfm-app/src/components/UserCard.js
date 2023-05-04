import React from "react"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Tooltip from '@mui/material/Tooltip';
import TodayIcon from '@mui/icons-material/Today';
import moment from "moment";

export default function UserCard(props) {
  const {name, country, image, playcount, registered, type} = props.userData.user;
  const avatarUrl = image?.[3]?.["#text"];
  const hasLocation = country !== "None";
  const registeredDate = moment.unix(registered.unixtime).format("DD MMM YYYY");

  let typeColor = "";

  switch(type) {
    case "user":
      typeColor = "userColor";
      break;
    case "subscriber":
      typeColor = "subscriberColor";
      break;
    case "alum":
      typeColor = "alumColor";
      break;
    case "mod":
      typeColor = "modColor";
      break;
    default:
      typeColor = "";
      break;
  }

  return (
    <section className="userCard">
      <Card
        style={{
          width: 300,
          height: 400
        }}>
      <CardHeader
        avatar={<Avatar src={avatarUrl}/>}
        title={
          <>
            {name} <span className={typeColor}>{type.toUpperCase()}</span>
            </>
        }
        subheader={hasLocation && (
          <Typography variant="body2" component="p">
            {country}
          </Typography>
        )}
      />
      <CardContent>
      <div className="icons">
        <Tooltip title={`${Number(playcount).toLocaleString()} scrobbles`}>
          <MusicNoteIcon
            style={{
            fontSize: 25
            }}
          />
        </Tooltip>
        <Tooltip title={`Scrobbling since ${registeredDate}`}>
          <TodayIcon
            style={{
              fontSize: 25
            }}
          />
        </Tooltip>
      </div>
      </CardContent>
    </Card>
    </section>
  )
}
