import {
  ADD_NOTE,
  SELECTED_NOTE,
  SEARCH_NOTES,
  DELETE_NOTE,
  EDIT_NOTE,
  ADD_TO_FAVORITES,
  FETCH_NOTES
} from "./actionTypes";

export const getNotes = () =>({
    type: FETCH_NOTES
})

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});
export const selectNote = (note) => ({
  type: SELECTED_NOTE,
  payload: note,
});
export const filterNotes = (term) => ({
  type: SEARCH_NOTES,
  payload: term,
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: id,
});

export const editNote = (id) => ({
  type: EDIT_NOTE,
  payload: id,
});

export const addToFavorites = (payload) => ({
  type: ADD_TO_FAVORITES,
  payload,
});
