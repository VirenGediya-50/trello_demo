import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import SubTaskBox from "./SubTaskBox";

const TaskBox = (props) => {
  const { taskList, addSubTask, updateStatus, updateSubTask, moveSubTaskFromTask } = props;
  const [ subTaskName, setSubTaskName] = useState("");
  const { name, id, subTasks } = taskList;
  const [error, setError] = useState(false);

  const handleChangeText = (e) => {
    if (e.key === "Enter") {
      if(subTaskName !== ""){
        addSubTask(subTaskName, id);
        setSubTaskName("");
        setError(false);
      }else{
        setError(true)
      }
    }
  };

  const moveSubTask = (startIndex, lastIndex, parentId) => {
      let newSubTaskList = [...subTasks];
      let lstIndex = newSubTaskList.findIndex(i => i.subTaskId === parseInt(lastIndex));
      let sttIndex = newSubTaskList.findIndex(i => i.subTaskId === parseInt(startIndex));
      const newObj = newSubTaskList[sttIndex];
      
      newSubTaskList.splice(sttIndex, 1);
      newSubTaskList.splice(lstIndex, 0, newObj);
      
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
            moveSubTaskFromTask={moveSubTaskFromTask}
          />
        );
      })}
      <TextField
        error={error}
        className="add_task_textfield"
        onChange={(e) => {setSubTaskName(e.target.value); setError(false)}}
        onKeyUp={(e) => handleChangeText(e)}
        value={subTaskName}
        placeholder="Add a task"
        helperText={error && "Please Enter Task name"}
      />
    </Grid>
  );
};

export default TaskBox;