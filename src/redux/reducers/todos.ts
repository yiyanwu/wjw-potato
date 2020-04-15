import { ADD_TODO, INIT_TODOS, UPDATE_TODOS, EDIT_TODOS } from "../actionTypes";

export default function (state = [],action:any) {
    switch (action.type){
        case ADD_TODO:
            return [...state,action.payload]
        case INIT_TODOS:
            return [...action.payload]
        case UPDATE_TODOS:
            return state.map((t:any) => {
                if(t.id === action.payload.id){
                    return action.payload
                }else{ return t }
            })
        case EDIT_TODOS:
            return state.map((t:any) => {
                if(t.id === action.payload){
                    return Object.assign({},t,{editing:true})
                }else {
                    return Object.assign({},t,{editing:false})
                }
            })
            
        default:
            return state
    }
}