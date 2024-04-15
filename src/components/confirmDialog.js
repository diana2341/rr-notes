import deleteImg from "../imgs/delete.svg";

const ConfirmDialog = (props) => {
  return (
    <>
      <div className="backdrop" onClick={props.closeFunc}></div>
      <dialog className="modal delete-modal">
        <h2>Are you sure you want to delete this note?</h2>

        <img src={deleteImg} />
        <div className="form-actions">
          <button onClick={props.closeFunc}>Cancel</button>
          <button onClick={props.submitAction}>Delete Note</button>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmDialog;
