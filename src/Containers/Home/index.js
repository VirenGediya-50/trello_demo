import { Button, Grid, Icon } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  add_sub_task,
  add_task,
  change_subtask_status,
  move_subtask,
} from "../../Actions/tasks.action";
import TaskBox from "../../Components/TaskBox";
import TaskDialogBox from "../../Components/TaskDialogBox";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDialogBox: false,
    };
  }

  handleTaskDialogBox = () => {
    this.setState({
      taskDialogBox: !this.state.taskDialogBox,
    });
  };

  moveSubTaskFromTask = (startIndex, lastIndex, startParentId, lastParentId ) => {
    let startParentIndex = this.props.taskList.findIndex(i => i.id === parseInt(startParentId));
    let startSubTaskList = [...this.props.taskList[startParentIndex].subTasks];
    let sttIndex = startSubTaskList.findIndex(i => i.subTaskId === parseInt(startIndex));
    let startObj = startSubTaskList[sttIndex];

    let lastParentIndex = this.props.taskList.findIndex(i => i.id === parseInt(lastParentId));
    let lastSubTaskList = [...this.props.taskList[lastParentIndex].subTasks];
    let lstIndex = lastSubTaskList.findIndex(i => i.subTaskId === parseInt(lastIndex));

    startSubTaskList.splice(sttIndex,1);
    lastSubTaskList.splice(lstIndex, 0, startObj);

    this.props.updateSubTask(startSubTaskList, startParentId);
    this.props.updateSubTask(lastSubTaskList, lastParentId);
  }

  createTaskList = (name) => {
    this.props.addTask(name);
    this.handleTaskDialogBox();
  };

  render() {
    const { taskDialogBox } = this.state;
    const { taskList, updateStatus, addSubTask, updateSubTask } = this.props;
    return (
      <Grid container direction={'row'} className="all_tasks">
        {taskList.map((item) => (
          <TaskBox
            taskList={item}
            key={item.id}
            id={item.id}
            addSubTask={addSubTask}
            updateStatus={updateStatus}
            updateSubTask={updateSubTask}
            moveSubTaskFromTask={this.moveSubTaskFromTask}
          />
        ))}
        <Grid xs={2} sm={2}>
          <Button
            className="new_button"
            onClick={this.handleTaskDialogBox}
            variant="contained"
          >
            <Icon>add_circle</Icon> New Column
          </Button>
        </Grid>
        <TaskDialogBox
          open={taskDialogBox}
          onClose={this.handleTaskDialogBox}
          onSubmit={this.createTaskList}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { taskList } = state.taskReducer;
  return {
    taskList,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTask: (name) => dispatch(add_task(name)),
    addSubTask: (name, task_id) => dispatch(add_sub_task(name, task_id)),
    updateStatus: (name, task_id) =>
      dispatch(change_subtask_status(name, task_id)),
    updateSubTask: (data, task_id) =>
      dispatch(move_subtask(data, task_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
