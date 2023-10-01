import { useContext } from "react";
import { Appcontext } from "../context/contextuser";

function NewNote() {

  const {NoteTitle, Notebody, handleTitle, handleBody, handleClick} = useContext(Appcontext)

    return(
    <div className="note new">

    <textarea 
    rows="2" 
    cols="4" 
    placeholder="Add a Title."
    value={NoteTitle}
    onChange={handleTitle}>
    </textarea>

    <textarea 
    rows="8" 
    cols="10" 
    placeholder="Type here to add a Note."
    value={Notebody}
    onChange={handleBody}>
    </textarea>

    <div className="footer-1">
    <button className="save" onClick={handleClick}>Save</button>
    </div>
    </div>
    )
    
}

export default NewNote;