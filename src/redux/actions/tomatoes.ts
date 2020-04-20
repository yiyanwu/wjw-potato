import { ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO } from "../actionTypes";

export const addTomato = (payload: any) => {
    return {
        type: ADD_TOMATO,
        payload
    }
}

export const updateTomato = (payload: any) => {
    return {
        type: UPDATE_TOMATO,
        payload
    }
}

export const initTomatoes = (payload: any[]) => {
    return {
        type: INIT_TOMATOES,
        payload
    }
}