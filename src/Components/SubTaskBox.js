import { Checkbox, Grid } from "@mui/material";
import React from "react";

const SubTaskBox = (props) => {
  const { subTask, taskId, updateStatus } = props;
  const { name, subTaskId, completed } = subTask;

  const handleDragEnd = (event) => {
    const startIndex = event.dataTransfer.getData("startID");
    const parentID = event.dataTransfer.getData("parentId");
    const lastIndex = event.target.id;

    if (parentID === event.target.parentElement.id) {
      props.moveSubTask(startIndex, lastIndex, parentID);
    } else {
      alert("Same side swipe allow.");
    }
  };

  const handleDrugStart = (event) => {
    event.dataTransfer.setData("startID", subTaskId);
    event.dataTransfer.setData("parentId", taskId);
  };

  return (
    <Grid
      id={subTaskId}
      className={"sub_task"}
      draggable={true}
      onDragStart={(e) => handleDrugStart(e)}
      onDrop={(e) => handleDragEnd(e)} 
      onDragOver={(e) => e.preventDefault()}
    >
      <h4 className="subtask_title">
        <Checkbox
          checked={completed}
          disabled={completed}
          onChange={() => {
            updateStatus(subTaskId, taskId);
          }}
        />
        {name}
      </h4>
    </Grid>
  );
};

export default SubTaskBox;
