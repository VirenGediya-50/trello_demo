import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import SubTaskBox from "./SubTaskBox";

const TaskBox = (props) => {
  const { taskList, addSubTask, updateStatus, updateSubTask } = props;
  const [ subTaskName, setSubTaskName] = useState("");
  const { name, id, subTasks } = taskList;

  const handleChangeText = (e) => {
    if (e.key === "Enter") {
      addSubTask(subTaskName, id);
      setSubTaskName("");
    } else {
      setSubTaskName(e.target.value);
    }
  };

  const moveSubTask = (startIndex, lastIndex, parentId) => {
      let newSubTaskList = [...subTasks];
      const newObj = newSubTaskList[parseInt(startIndex - 1)];
      newSubTaskList.splice((startIndex-1), 1);
      newSubTaskList.splice(lastIndex-1, 0, newObj);
      updateSubTask(newSubTaskList, parentId);
  }

  return (
    <Grid md={2} sm={2} className="task_list" key={id} id={id}>
      <h2 className="task_title">{name}</h2>
      {subTasks.map((item) => {
        return (
          <SubTaskBox
            subTask={item}
            key={item.subTaskId}
            taskId={id}
            updateStatus={updateStatus}
            moveSubTask={moveSubTask}
          />
        );
      })}
      <TextField
        className="add_task_textfield"
        onChange={(e) => setSubTaskName(e.target.value)}
        onKeyUp={(e) => handleChangeText(e)}
        value={subTaskName}
        placeholder="Add task"
      />
    </Grid>
  );
};

export default TaskBox;