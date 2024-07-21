import {
    ADD_TEAM_SUCCESS,
    DELETE_TEAM_SUCCESS,
    EDIT_TEAM_SUCCESS,
    FETCH_TEAM_SUCCESS,
} from "../../actions/team/types"


const defaultState = {
    list: [],
    error: null,
}

const teamReducer = (state = defaultState, action) =>{
    switch(action.type) {
        case FETCH_TEAM_SUCCESS:
            return {
                ...state,
                list: [...action.payload] };
        case ADD_TEAM_SUCCESS:
            return {...state,
                 list:[...state.teams, action.payload ]};
        case EDIT_TEAM_SUCCESS:
            return {
                ...state,
                list:  state.list.map( t => t._id == action.payload._id ? action.payload : t ) 
            }
        case DELETE_TEAM_SUCCESS:
            return {
                ...state,
                list:  state.list.filter( t => t._id != action.payload)
            }
        default:
            return state;
    }
}

export default teamReducer;
