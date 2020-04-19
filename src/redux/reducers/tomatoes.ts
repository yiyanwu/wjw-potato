import { ADD_TOMATO } from "../actionTypes";

export default function (state = [], action: any) {
    switch(action.type) {
        case ADD_TOMATO:
            return [...state, action.payload]
        default:
            return state
    }
}