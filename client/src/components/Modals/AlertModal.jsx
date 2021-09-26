import './Modals.css'

// Display alerts
export default function AlertModal(props) {
    return (
        <>    
            {props.showAlert ? (
                <div className='alert-box' onClick={() => props.setShowAlert(prev=>!prev)}>
                    {props.alert}   
                </div>) : ''
            }
        </>
    )
}
