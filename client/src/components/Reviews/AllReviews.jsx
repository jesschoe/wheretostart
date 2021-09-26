import { useState, useEffect } from 'react'
import { getReviews, deleteReview } from '../../services'
import Modal from '../Modals/Modal'
import DeleteModal from '../Modals/DeleteModal'
import './AllReviews.css'

// fetch and sort array of reviews by created time and display
export default function AllReviews(props) {
    const [ reviews, setReviews ] = useState([])
    const [ showModal, setShowModal ] = useState(false)
    const [ showDeleteModal, setShowDeleteModal ] = useState(false)
    const now = new Date

    useEffect(() => {
        if (props.reviewIds) {
            props.reviewIds.map(async (reviewId) => {
                const data = await getReviews(reviewId)
                let date = Date.parse(data.createdTime)

                // format time for displaying purposes
                let displayDate = data.createdTime.split('')

                for (let i = 0; i < displayDate.length; i++) {
                    if (displayDate[i] === 'T') {
                        displayDate[i] = ' '
                    } else if (displayDate[i] === '.') {
                        displayDate.splice([i], 5)
                    }
                }

                displayDate = displayDate.join('')
                
                const reviewObj = {
                    title: data.fields.title,
                    username: data.fields.username,
                    Movies: data.fields.Movies[0],
                    review: data.fields.review,
                    id: reviewId,
                    time: displayDate,
                    date: date
                }
                setReviews((prevState) => [...prevState, reviewObj])
            }
        )}
    }, [props.reviewIds])

    const handleDelete = () => {
        setShowDeleteModal(true)
    }

    const confirmDelete = async(id) => {
        await deleteReview(id)
        window.location.reload();
    }

    function compare( rev1, rev2 ) {
        if ( rev1.date < rev2.date){
            return 1;
        }
        else {
            return -1;
        }
    }

    reviews.sort(compare)

    const handleEdit = async(id) => {
        setShowModal(prev => !prev)
    }

    // display reviews and only enable edit and delete on most recent post
    return (
        <div className='reviews-container'>
            <h3>REVIEWS</h3>
            {reviews.map((review, i) =>
                <div className='reviews' key={review.id}>
                    <p className='review-text'>{review.review}</p>
                    <p className='review-name'>-{review.username}</p>
                    <p className='review-time'>{review.time}</p>
                    {now - review.date < 10000? (
                        <div className='review-btns'>
                            <button 
                                onClick={()=>handleEdit(review.id)}
                            >edit</button>
                            <button 
                                onClick={()=>handleDelete(review.id)}
                            >delete</button>
                        </div>
                    ) : 
                        ''
                    }
                    
                </div>
            )}
            <Modal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                reviews={reviews[0]} 
                edit='true'
                message='make your changes and re-submit!'
            />
            <DeleteModal 
                showDeleteModal={showDeleteModal} 
                setShowDeleteModal={setShowDeleteModal}
                confirmDelete={confirmDelete}
                reviews={reviews[0]}
                alert='are you sure you want to delete?'
            />  
        </div>
    )
}