import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import GetAppIcon from '@mui/icons-material/GetApp';
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Tooltip from '@mui/material/Tooltip';
import TodayIcon from '@mui/icons-material/Today';
import moment from "moment";
import html2canvas from "html2canvas";

export default function UserCard(props) {
  const {name, country, image, playcount, registered, type, url} = props.userData.user;
  const avatarUrl = image?.[3]?.["#text"];
  const profileUrl = url;
  const hasLocation = country !== "None";
  const registeredDate = moment.unix(registered.unixtime).format("DD MMM YYYY");
  const [imageDataUri, setImageDataUri] = React.useState(null);
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

  function handleDownload() {
  }

  return (
    <section className="cardContainer">
      <Card
        className="userCard"
      >
      <CardHeader
        avatar={<a href={profileUrl}><Avatar src={avatarUrl}/></a>}
        title={
          <>
            {name} <span className={typeColor}> {type.toUpperCase()}</span>
          </>
        }
        subheader={
          hasLocation ? (
            <div className="subheaderWithLocation">
              <Typography variant="body2" component="p">
                {country} <Tooltip title={`${Number(playcount).toLocaleString()} scrobbles`}>
                  <MusicNoteIcon style={{ fontSize: 25 }} />
                </Tooltip>
                <Tooltip title={`Scrobbling since ${registeredDate}`}>
                  <TodayIcon style={{ fontSize: 25 }} />
                </Tooltip>
              </Typography>
            </div>
          ) : (
            <div className="subheaderWithoutLocation">
              <div className="icons">
                <Tooltip title={`${Number(playcount).toLocaleString()} scrobbles`}>
                  <MusicNoteIcon style={{ fontSize: 25 }} />
                </Tooltip>
                <Tooltip title={`Scrobbling since ${registeredDate}`}>
                  <TodayIcon style={{ fontSize: 25 }} />
                </Tooltip>
              </div>
            </div>
          )
        }
        // action={
        //   <IconButton onClick={handleDownload}>
        //     <DownloadIcon/>
        //   </IconButton>
          
        // }
      />
      <CardContent>
          {props.recommendation && (
            <div>
              <Typography variant="h6" component="h6" align="center"><b>
            
              </b></Typography>
                <ul>
                  {props.recommendation.map((artist) => (
                    <li key={artist}>{artist}</li>
                  ))}
                </ul>
            </div>
          )}
      </CardContent>
    </Card>

    {imageDataUri && (
      <a href={imageDataUri} download="user-card.png">
      </a>
    )}
    </section>
  )
}