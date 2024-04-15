import {
  ADD_NOTE,
  SELECTED_NOTE,
  SEARCH_NOTES,
  DELETE_NOTE,
  EDIT_NOTE,
  ADD_TO_FAVORITES,
  FETCH_NOTES,
} from "../actions/actionTypes";
// import allNotes from "../data/notes.json";

const initialState = {
  notes: [],
  selectedNote: {},
};

const notesReducer = (state = initialState, action) => {
  const existingNotes = JSON.parse(localStorage.getItem("myNotes")) || [];

  switch (action.type) {
    case FETCH_NOTES:
      return {
        ...state,
        notes: existingNotes,
      };
    case ADD_NOTE:
      const allUpdatedNotes = [...existingNotes, action.payload];

      localStorage.setItem("myNotes", JSON.stringify(allUpdatedNotes));

      return {
        ...state,
        notes: allUpdatedNotes,
      };
    case SELECTED_NOTE:
      return {
        ...state,
        selectedNote: action.payload,
      };
    case SEARCH_NOTES:
      const searchTerm = action.payload.trim().toLowerCase();
      let filteredNotes = [];

      if (searchTerm) {
        filteredNotes = existingNotes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchTerm) ||
            note.description.toLowerCase().includes(searchTerm) ||
            note.category.toLowerCase().includes(searchTerm)
        );
      } else {
        filteredNotes = existingNotes;
      }

      return {
        ...state,
        notes: filteredNotes,
      };
    case DELETE_NOTE:
      const updatedNotes = state.notes.filter(
        (note) => note.id !== action.payload
      );
      localStorage.setItem("myNotes", JSON.stringify(updatedNotes));

      return {
        ...state,
        notes: updatedNotes,
      };
    case EDIT_NOTE:
      let notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      localStorage.setItem("myNotes", JSON.stringify(notes));

      return {
        ...state,
        notes: notes,
      };
    case ADD_TO_FAVORITES:
      let updated = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          note.favorite = action.payload.favorite;
        }
        return note;
      });
      localStorage.setItem("myNotes", JSON.stringify(updated));

      return {
        ...state,
        notes: updated,
      };
    default:
      return state;
  }
};

export default notesReducer;
