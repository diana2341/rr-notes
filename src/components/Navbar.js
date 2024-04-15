import { useEffect, useState } from "react";
import logo from "../imgs/logo.png";
import notesImg from "../imgs/notesImg.svg";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import { toggleModal } from "../actions/modalActions";
import {
  selectNote,
  filterNotes,
  addNote,
  editNote,
} from "../actions/notesActions";
import { toggleNotification } from "../actions/notificationActions";

const Navbar = () => {
  const open = useSelector((state) => state.modal.isOpened);
  const selectedNote = useSelector((state) => state.notes.selectedNote);
  const notes = useSelector((state) => state.notes.notes);
  const show = useSelector((state) => state.notification.show);

  const isEdit = useSelector((state) => state.modal.isEditModal);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [err, setErr] = useState(false);

  const dispatch = useDispatch();
  const close = () => {
    dispatch(toggleModal({ isEdit: false, isOpen: !open }));
    dispatch(selectNote());
    setErr(false);

  };
  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(filterNotes(e.target.value));
  };
  useEffect(() => {
    if (selectedNote?.id) {
      setTitle(selectedNote.title);
      setDescription(selectedNote.description);
      setCategory(selectedNote.category.toLowerCase());
      setDate(selectedNote.date);
    } else {
      setCategory("");
      setTitle("");
      setDescription("");
    }
  }, [selectedNote]);
  const addNewNote = () => {
    let newDate = new Date();
    newDate =
      (newDate.getMonth() > 8
        ? newDate.getMonth() + 1
        : "0" + (newDate.getMonth() + 1)) +
      "/" +
      (newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate()) +
      "/" +
      newDate.getFullYear();
    if (title && description && category && category !== "--Select--") {
      dispatch(
        addNote({
          id: uniqid(),
          title,
          description,
          category,
          edited_date: false,
          favorite: false,
          date: newDate,
        })
      );
      setCategory("");
      setTitle("");
      setDescription("");
      dispatch(toggleModal({ isEdit: false, isOpen: !open }));
      setErr(false);
      dispatch(
        toggleNotification({
          show: true,
          title: "Success",
          description: "Your Note Was Created Successfully!",
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
      }, 5000);
    } else {
      setErr(true);
    }
  };
  const editCurrNote = () => {
    if (title && description && category && category !== "--Select--") {
      dispatch(
        editNote({
          id: selectedNote.id,
          title,
          description,
          category,
          edited_date: false,
          favorite: false,
          date,
        })
      );
      setCategory("");
      setTitle("");
      setDescription("");
      setDate("");
      setErr(false);

      dispatch(
        toggleNotification({
          show: true,
          title: "Success",
          description: "Your Note Was Updated Successfully!",
          type: "success",
        })
      );
      dispatch(toggleModal({ isEdit: false, isOpen: !open }));

      setTimeout(() => {
        dispatch(
          toggleNotification({
            show: false,
            title: "",
            description: "",
            type: "",
          })
        );
      }, 5000);
    } else {
      setErr(true);
    }
  };
  const openCreateModal = () => {
    dispatch(toggleModal({ isEdit: false, isOpen: !open }));
  };
  return (
    <>
      <div className="navbar">
        <img src={logo} />
        <div className="right-nav">
          <input
            placeholder="Search notes ..."
            value={searchTerm}
            onChange={(e) => onChangeSearch(e)}
          />
          <div className="add-note" onClick={openCreateModal}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>

      {open && (
        <dialog className="modal">
          {isEdit && <h2>Edit Note</h2>}
          {!isEdit && notes.length >= 1 && <h2>Ready To Add More Notes</h2>}
          {!isEdit && notes.length === 0 && <h2>Ready To Add Notes</h2>}

          <img src={notesImg} />
          <div className="form">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option>--Select--</option>

              <option value="work">Work</option>
              <option value="general">General</option>
              <option value="study">Study</option>
            </select>

            <input
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {err && <p className="err">***Fill Out All Fields***</p>}
            <div className="form-actions">
              <button onClick={close}>Cancel</button>

              {isEdit && <button onClick={editCurrNote}>Update</button>}
              {!isEdit && <button onClick={addNewNote}>Add Note</button>}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
export default Navbar;
