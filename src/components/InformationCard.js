import React from "react";
import "./InformationCard.css";
import { RoomOutlined, PhoneOutlined, PersonOutlined, DateRangeOutlined, LockOutlined } from '@material-ui/icons';
import { capitalize } from "./Utilities";

const InformationCard = (props) => {
  const info  = props.info;
  const changeTab = (tab) => {
    let listTab = ["name", "date", "location", "phone", "private"];
    for (let i = 0; i < listTab.length; i++) {
      if (listTab[i] === tab) {
        if (document.getElementById(listTab[i])) {
          document.getElementById(listTab[i]).style.display = "block";
        }
        document.getElementById(listTab[i] + "Icon")?.classList.add("focus");
      } else {
        if (document.getElementById(listTab[i])) {
          document.getElementById(listTab[i]).style.display = "none";
        }
        document.getElementById(listTab[i] + "Icon")?.classList.remove("focus");
      }
    }
  }
  return (
    <div className="card">
      <div className="header"></div>
      <img className="avatar" src={info.picture} alt="" />
      <div className="content">
        <div id="name" style={{display: "block"}}>
          <div className="content-detail highlight">
            {capitalize(info.name.title)} {capitalize(info.name.first)} {capitalize(info.name.last)}
          </div>
          <div className="content-detail">Gender: {info.gender}</div>
          <div className="content-detail">{info.email}</div>
        </div>

        <div id="date" style={{display: "none"}}>
          <div className="content-detail highlight">
            DOB: {info.dob}
          </div>
          <div className="content-detail">Registered: {info.registered}</div>
        </div>

        <div id="location" style={{display: "none"}}>
          <div className="content-detail">My address is</div>
          <div className="content-detail highlight">
            {capitalize(info.location.street)},
          </div>
          <div className="content-detail highlight">{capitalize(info.location.city)}, {capitalize(info.location.state)}</div>
        </div>

        <div id="phone" style={{display: "none"}}>
          <div className="content-detail highlight">Phone: {info.phone}</div>
          <div className="content-detail">Cell: {info.cell}</div>
          <div className="content-detail">SSN: {info.SSN}</div>
        </div>

        <div id="private" style={{display: "none"}}>
          <div className="content-detail">Username:</div>
          <div className="content-detail highlight">
            {info.username}
          </div>
        </div>
      </div>

      <div className="footer">
        <PersonOutlined id="nameIcon" className="icon focus" onClick={() => changeTab("name")}/>
        <DateRangeOutlined id="dateIcon" className="icon" onClick={() => changeTab("date")}/>
        <RoomOutlined id="locationIcon" className="icon" onClick={() => changeTab("location")}/>
        <PhoneOutlined id="phoneIcon" className="icon" onClick={() => changeTab("phone")}/>
        <LockOutlined id="privateIcon" className="icon" onClick={() => changeTab("private")}/>
      </div>
    </div>
  )
}
export default InformationCard;
