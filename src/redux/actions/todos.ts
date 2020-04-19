import { ADD_TODO, INIT_TODOS, UPDATE_TODOS, EDIT_TODOS } from "../actionTypes";

export const addTodo = (payload:any) => {
    return {
        type: ADD_TODO,
        payload
    }
}

export const initTodos = (payload:any[]) => {
    return {
        type:INIT_TODOS,
        payload
    }
}

export const updateTodo = (payload: any) => {
    return {
        type: UPDATE_TODOS,
        payload
    }
}

export const editTodo = (payload: number) => {
    return {
        type: EDIT_TODOS,
        payload
    }
}