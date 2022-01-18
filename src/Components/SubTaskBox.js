import { Checkbox, Grid } from "@mui/material";
import React from "react";
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import { faceImagePath } from "../Assets/imagesPath";

const SubTaskBox = (props) => {
  const { subTask, taskId, updateStatus } = props;
  const { name, subTaskId, completed } = subTask;

  const handleDragEnd = (event) => {
    const startIndex = event.dataTransfer.getData("startID");
    const parentID = event.dataTransfer.getData("parentId");
    const lastIndex = event.currentTarget.id;

    if (parentID === event.currentTarget.parentElement.id) {
      props.moveSubTask(startIndex, lastIndex, parentID);
    } else {
      alert("Same side swipe allow.");
      // let startParentId = event.dataTransfer.getData("parentId");
      // let lastParentId = event.currentTarget.parentElement.id;
      // props.moveSubTaskFromTask(startIndex, lastIndex, startParentId, lastParentId)
    }
  };

  const handleDrugStart = (event) => {
    event.dataTransfer.setData("startID", subTaskId);
    event.dataTransfer.setData("parentId", taskId);
  };

  return (
    <Grid
      container
      direction={"row"}
      id={subTaskId}
      className={"sub_task"}
      draggable={true}
      onDragStart={(e) => handleDrugStart(e)}
      onDrop={(e) => handleDragEnd(e)} 
      onDragOver={(e) => e.preventDefault()}
    >
      <Grid item>
        <Checkbox
          checked={completed}
          disabled={completed}
          onChange={() => {
            updateStatus(subTaskId, taskId);
          }}
        />
      </Grid>
      <Grid item xs className="subtitle_grid">
        <h4 className="subtask_title">{name}</h4>
        <Grid
          xs={6}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span>75%</span>
          <span><AttachFileSharpIcon className="clip_icon" />11</span>
          <span><CommentRoundedIcon className="clip_icon" />15</span>
        </Grid>
        <Grid
          xs={12}
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="end"
          className="viewers"
        >
          <span className="calender">Jan</span>
          <span><img src={faceImagePath} className="image_chip" alt="Image"/></span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubTaskBox;
