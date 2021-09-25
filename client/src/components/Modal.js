import SubmitReview from "./Reviews/SubmitReview"
import EditReview from "./Reviews/EditReview"

// Display edit or submit review component depending on props passed
export default function Modal(props) {
    return (
        <div>
            {props.showModal ? (
                <div> 
                    {props.edit ? 
                        <EditReview 
                            setShowModal={props.setShowModal}
                            reviews={props.reviews} 
                            edit={props.edit} 
                        /> :
                        <SubmitReview setShowModal={props.setShowModal} /> 
                    }
                </div>) : ''
            }
        </div>
    )
}
