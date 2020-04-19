import { ADD_TOMATO, INIT_TOMATOES } from "../actionTypes";

export default function (state = [], action: any) {
    switch(action.type) {
        case ADD_TOMATO:
            return [...state, action.payload]
        case INIT_TOMATOES:
            return [...action.payload]
        default:
            return state
    }
}