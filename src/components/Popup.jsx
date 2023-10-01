import './popup.css'


function PopupDrill(props) {
    return(props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {props.children}
                <button onClick={() => props.setpopup(false)} className='popup-btn'>Okay!</button>
            </div>
        </div>
    ) : "";
}

function ConfirmationPopup({onDelete, onCancel, showconfirmation, id}) {
    
    return({showconfirmation}) ? (
        <div className="popup">
            <div className="popup-inner">
                <p className='popup-p'>are you sure you want to delete this note?</p>
                <div className='btn'>
                    <button  className="del-btn" onClick={onDelete}>Delete</button>
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
                
            </div> 
        </div>
    ) : "";
}



export default PopupDrill;
export {ConfirmationPopup};