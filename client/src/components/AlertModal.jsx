

// Display alerts
export default function AlertModal(props) {
    const closeAlert = () => {
        props.setShowAlert(false)
    }
    return (
        <>    
            {props.showAlert ? (
                <div className='alert-box' onClick={closeAlert}>
                    {props.alert}   
                </div>) : ''
            }
        </>
    )
}
