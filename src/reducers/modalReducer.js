import { OPEN_MODAL } from "../actions/actionTypes";

const initialState = {
  isOpened: false,
  isEditModal: false,
};

const modalReducer = (state = initialState, action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpened: action.payload.isOpen,
        isEditModal: action.payload?.isEdit,
      };
    default:
      return state;
  }
};

export default modalReducer;
