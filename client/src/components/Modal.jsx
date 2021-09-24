import SubmitReview from "./Reviews/SubmitReview"

export default function Modal(props) {
    return (
        <div>
            {props.showModal ? (
                <div className='modal-container'>    
                    <SubmitReview setShowModal={props.setShowModal}/>
                </div>
            ) : ''}
        </div>
    )


}
