import { TOGGLE_NOTIFICATION } from "../actions/actionTypes";

const initialState = {
    title:'',
    description:'',
    show: false,
    type:""

}

const notificationReducer = (state=initialState, action)=>{
    switch(action.type){
        case TOGGLE_NOTIFICATION:
            return{
                title: action.payload.title,
                description: action.payload.description,
                show: action.payload.show,
                type: action.payload.type
            }
        default: 
        return state
    }
}

export default notificationReducer