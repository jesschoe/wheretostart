import './Modals.css'

// Display delete confirmation
export default function DeleteModal(props) {
    const closeAlert = () => {
        props.setShowDeleteModal(false)
    }
    return (
        <>    
            {props.showDeleteModal ? (
                <div className='delete-alert-box' onClick={closeAlert}>
                    <p>{props.alert}</p>
                    <div className='delete-alert-btns'>
                        <button onClick={()=>props.confirmDelete(props.reviews.id)}>yes</button>   
                        <button onClick={closeAlert}>no</button>
                    </div>
                </div>
            ) : ''
            }
        </>
    )
}
