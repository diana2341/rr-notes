import { useSelector } from "react-redux";
import { Draggable } from "react-drag-reorder";
import { useDispatch } from "react-redux";
import noResults from "../imgs/noReseults.svg";
import ConfirmDialog from "./confirmDialog";
import { useEffect, useState } from "react";
import {
  getNotes,
  selectNote,
  addToFavorites,
  deleteNote,
} from "../actions/notesActions";
import { toggleModal } from "../actions/modalActions";
import { toggleNotification } from "../actions/notificationActions";

const NoteList = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);
  const notes = useSelector((state) => state.notes.notes);
  const chipColor = (type) => {
    switch (type) {
      case "general":
        return "blue";
      case "work":
        return "orange";
      case "study":
        return "green";
    }
  };
  const openEdit = (note) => {
    dispatch(selectNote(note));
    dispatch(toggleModal({ isEdit: true, isOpen: true }));
  };
  const updateFavorite = (note) => {
    const des = note.favorite
      ? "Your Note Was Removed From Favorites!"
      : "Your Note Was Added To favorites!";
    dispatch(addToFavorites({ id: note.id, favorite: !note.favorite }));
  };
  const openConfirmDialog = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };
  const closeDeleteConfirm = ()=>{
    setDeleteId(null);
    setOpenConfirm(false);
  }
  const deleteCurrNote = () => {
    setOpenConfirm(false);
    if (!deleteId) return;
    dispatch(deleteNote(deleteId));
    dispatch(
      toggleNotification({
        show: true,
        title: "Success",
        description: "Note Successfully Deleted",
        type: "success",
      })
    );
    setTimeout(() => {
      dispatch(
        toggleNotification({
          show: false,
          title: "",
          description: "",
          type: "",
        })
      );
    }, 4000);
  };
  return (
    <>
      <div className="cards-container">
        {/* <Draggable> */}
        {notes.length > 0 &&
          notes.map((note) => {
            return (
              <div key={note.title} className="card">
                <div className="card-top">
                  <div
                    className="category"
                    style={{ backgroundColor: chipColor(note.category) }}
                  >
                    {note.category}
                  </div>
                  <div className="actions">
                    <i
                      className="fa-solid fa-pencil"
                      onClick={() => openEdit(note)}
                    ></i>{" "}
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => openConfirmDialog(note.id)}
                    ></i>
                  </div>
                </div>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
                <span className="date">{note.date}</span>
                <span className="star" onClick={() => updateFavorite(note)}>
                  {!note.favorite && <i className="fa-regular fa-star"></i>}
                  {note.favorite && <i className="fa-solid fa-star"></i>}
                </span>
              </div>
            );
          })}
        {/* </Draggable> */}
      </div>
      {notes.length === 0 && (
        <div className="not-found">
          <h1>No Notes Yet, Add Some!</h1>
          <img src={noResults} />
          <button
            className="add-btn"
            onClick={() =>
              dispatch(toggleModal({ isEdit: false, isOpen: true }))
            }
          >
            Add A Note <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      )}
      {openConfirm && <ConfirmDialog submitAction={deleteCurrNote} closeFunc={closeDeleteConfirm} />}
    </>
  );
};

export default NoteList;
