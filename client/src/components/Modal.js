import SubmitReview from "./Reviews/SubmitReview"

export default function Modal(props) {
    return (
        <div>
            {props.showModal ? (
                <div>    
                    <SubmitReview setShowModal={props.setShowModal}/>
                </div>
            ) : ''}
        </div>
    )


}
