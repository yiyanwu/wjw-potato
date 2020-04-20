import { ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO } from "../actionTypes";

export default function (state = [], action: any) {
    switch(action.type) {
        case ADD_TOMATO:
            return [...state, action.payload]
        case UPDATE_TOMATO:
            return state.map((t: any) => {
                if (t.id === action.payload.id) {
                    return action.payload
                } else { return t }
            })
        case INIT_TOMATOES:
            return [...action.payload]
        default:
            return state
    }
}