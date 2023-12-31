import { useContext, useState } from "react";
import { BsPinFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";


import { Appcontext } from "../context/contextuser";
import { ConfirmationPopup } from "./Popup";

function Note() {

        const {Note, deleteNote, handlesaveClick, handlebodychange, handletitlechange, handleEditclick,
            handlepin} = useContext(Appcontext)

            const [showconfirmation, setShowconfirmation] = useState(false)
            // this is for popup of delete icon
            
                const onCancel = () => {
                    setShowconfirmation(false)
                }
               
                const onDelete = (notetoDelete) => {
                    const idofNote = notetoDelete.id
                    deleteNote(idofNote)
                    setShowconfirmation(false)
                }

    

    return(
        <>
        {Note.map((note) => ( 
        <div className="note" key={note.id} >
        
         {note.edit ? (
             <div className="editable">
              <textarea
                rows="2"
                cols="4"
                type="text"
                value={note.title}
                onChange={(e) => handletitlechange(note.id, e.target.value)}
                className="new-text"
              />
              <textarea
                rows="8"
                cols="10"
                value={note.body}
                onChange={(e) => handlebodychange(note.id, e.target.value)}
                className="new-text"
              />
              <div className="footer-2">
                  <button onClick={() => handlesaveClick(note.id)} className="new-save">Save</button>
              </div>
            </div>
          ) : ( 
            <>
            <div className="header" 
          onClick={() => handleEditclick(note.id)} 
          >
                        <div className="header-1">{note.title}</div>
                        <div className="header-2">{note.body}</div>
                </div>
                    <div className="footer">
                            <span key={`date-${note.id}`}>{note.date}</span>

                            <div className="icon">
                                <div className={`pin-icon ${note.pinned ? 'pin-icon-selected' : ''}`}>
                                    <BsPinFill className="pin-icon-f" 
                                        onClick={() => handlepin(note.id)} 
                                        />
                                </div>
                                <MdDelete className="delete-icon" 
                                    onClick={() => setShowconfirmation(true)} 
                                    />
                                {showconfirmation &&
                                    <ConfirmationPopup showconfirmation={showconfirmation}
                                        onCancel={onCancel}
                                        onDelete={() => onDelete(note)}
                                        note={note}
                                         />}
                            </div>
                        </div> 
                        </>
                      )}
                     
            </div>
    ))}
            </>


    )
    
}

export default Note;