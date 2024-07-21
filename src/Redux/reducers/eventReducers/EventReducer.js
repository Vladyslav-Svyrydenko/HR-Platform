//import { history } from "helpers/history";
import {
    ADD_EV_SUCCESS,
    FETCH_EV_SUCCESS,
    EDIT_EV_SUCCESS,
    DELETE_EV_SUCCESS,

} from "../../actions/event/types"

const defaultState = {
    list: [],
    error: null,
}


const eventReducer = (state = defaultState, action) =>{
    switch(action.type) {
        case FETCH_EV_SUCCESS:
            return {
                ...state,
                list: [...action.payload] };
        case ADD_EV_SUCCESS:
            return {...state, list:[...state.events, action.payload ]};
        case EDIT_EV_SUCCESS:
            return {
                ...state,
                list:  state.list.map( ev => ev._id == action.payload._id ? action.payload : ev ) 
            }
        case DELETE_EV_SUCCESS:
            return {
                ...state,
                list:  state.list.filter(ev => ev._id != action.payload)
            }
        default:
            return state;
    }
}

export default eventReducer;

