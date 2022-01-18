const InitialState = {
    taskList : []
}

export const taskReducer = (state = InitialState, action) => {
    const newTaskList = [...state.taskList];
    switch (action.type) {
        case "ADD_TASK":
            const obj = {
                name: action.payload,
                id: newTaskList.length > 0 ? (newTaskList[newTaskList.length - 1].id + 1) : 1,
                subTasks : []
            }
            newTaskList.push(obj);
            return {...state, taskList : [...newTaskList]};

        case "ADD_SUB_TASK":
            let subTaskList = [...newTaskList[action.payload.id - 1 ].subTasks];
            const subTaskObj = {
                name : action.payload.name,
                subTaskId: subTaskList.length > 0 ? (subTaskList[subTaskList.length - 1].subTaskId + 1) : 1,
                completed: false 
            }
            subTaskList.push(subTaskObj);
            newTaskList[action.payload.id - 1 ].subTasks = [...subTaskList];
            return {...state, taskList : [...newTaskList]};

        case "UPDATE_SUBTASK_STATUS":
            let oldSubTaskList = [...newTaskList[action.payload.taskId - 1 ].subTasks];
            oldSubTaskList[action.payload.subTaskId - 1].completed = !oldSubTaskList[action.payload.subTaskId - 1].completed;
            newTaskList[action.payload.taskId - 1 ].subTasks =  [...oldSubTaskList];
            return {...state, taskList: [...newTaskList]}
        
        case "MOVE_SUBTASK":
            newTaskList[action.payload.taskId-1].subTasks = [...action.payload.subTaskList];
            return {...state, taskList: [...newTaskList]}

        default:
            return state
    }
}