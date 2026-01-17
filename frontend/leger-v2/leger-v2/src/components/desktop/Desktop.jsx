import { useState } from "react";
import Taskbar from "../taskbar/Taskbar";

function Desktop() {
  const [applications, setApplications] = useState({});
  return (
    <div>
      <img />
      {applications.map((application) => {
        <div>{application.content}</div>;
      })}
      <Taskbar props={applications} />
    </div>
  );
}

export default Desktop;
