import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import modalReducer from "./modalReducer"
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
   notes: notesReducer,
   modal: modalReducer,
   notification: notificationReducer
});

export default rootReducer