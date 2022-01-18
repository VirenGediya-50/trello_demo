
export const add_task = (data) => {
    return {
        type: "ADD_TASK",
        payload: data
    }
}

export const add_sub_task = (name, id) => {
    return {
        type: "ADD_SUB_TASK",
        payload: {
            name,
            id
        }
    }
}

export const change_subtask_status = (subTaskId, taskId) => {
    return {
        type: 'UPDATE_SUBTASK_STATUS',
        payload: {
            subTaskId,
            taskId
        }
    }
}

export const move_subtask = (subTaskList, taskId) => {
    return {
        type: 'MOVE_SUBTASK',
        payload: {
            subTaskList,
            taskId
        }
    }
}