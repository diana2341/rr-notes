import NotesList from "./components/NoteList";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleModal } from "./actions/modalActions";
const App = () => {
    const dispatch = useDispatch()
    const open = useSelector(state=>state.modal.isOpened)
  return (
    <div>
      {open&&<div className="backdrop" onClick={()=>dispatch(toggleModal({ isEdit: false, isOpen: !open }))}></div>}

      <Navbar />
      <NotesList />
      <Notification/>
    </div>
  );
};
export default App;
