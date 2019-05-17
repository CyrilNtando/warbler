import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";
export default function UserAside({ profileImageUrl, username }) {
  return (
    <aside className="col-sm2">
      <div className="panel panel-default">
        <div className="panel-body">
          <img
            src={profileImageUrl || DefaultProfileImg}
            alt={username}
            className="img-thumbnail"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      </div>
    </aside>
  );
}
