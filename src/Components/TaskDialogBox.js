import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const TaskDialogBox = (props) => {
  const { open, onClose, onSubmit } = props;
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setTaskName("");
  }, [open]);

  const handleTextValue = () => {
    if(taskName !== ""){
        onSubmit(taskName);
        setError(false);
    }else{
        setError(true);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="dialogbox">
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          error={error}
          autoFocus
          name="taskName"
          label="Enter Task Name"
          type="text"
          value={taskName}
          fullWidth
          onChange={(e) => {setTaskName(e.target.value); setError(false)}}
          variant="standard"
          helperText={error && "Please Enter Task name"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleTextValue()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialogBox;
