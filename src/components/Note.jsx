import { useContext, useState } from "react";

import { Appcontext } from "../context/contextuser";
import { ConfirmationPopup } from "./Popup";

function Note() {

        const {Note, deleteNote, handlesaveClick, handlebodychange, handletitlechange, handleEditclick,
            handlepin} = useContext(Appcontext)

            const [showconfirmation, setShowconfirmation] = useState(false)
            // this is for popup of delete icon
            const Confirmation = (id) => {
                setShowconfirmation(true)
            } 
                const onCancel = () => {
                    setShowconfirmation(false)
                }
               
                const onDelete = (id) => {
                    deleteNote(id)
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
                                    <img className="pin-icon-f" src="src/components/pngg/pin.png" alt="pin-icon"
                                        onClick={() => handlepin(note.id)} 
                                        />
                                </div>
                                <img className="delete-icon" src="src\components\pngg\delete2.png" alt="del-icon"
                                    onClick={() => Confirmation(note.id)} 
                                    />
                                {showconfirmation &&
                                    <ConfirmationPopup showconfirmation={showconfirmation}
                                        onCancel={onCancel}
                                        onDelete={() => onDelete(note.id)}
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