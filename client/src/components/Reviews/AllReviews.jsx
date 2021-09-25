import { useState, useEffect } from 'react'
import { getReviews, deleteReview } from '../../services'
import Modal from '../Modal'
import DeleteModal from '../DeleteModal'
import './AllReviews.css'

// fetch and sort array of reviews by created time and display
export default function AllReviews(props) {
    const [ reviews, setReviews ] = useState([])
    const [ showModal, setShowModal ] = useState(false)
    const [ showDeleteModal, setShowDeleteModal ] = useState(false)

    useEffect(() => {
        if (props.reviewIds) {
            props.reviewIds.map(async (reviewId) => {
                const data = await getReviews(reviewId)

                // format time for displaying purposes
                let time = data.createdTime.split('')

                for (let i = 0; i < time.length; i++) {
                    if (time[i] === 'T') {
                        time[i] = ' '
                    } else if (time[i] === '.') {
                        time.splice([i], 5)
                    }
                }

                // create new time variable for sorting purposes
                const compareTimes = time
                time = time.join('')

                for (let i = 0; i < compareTimes.length; i++) {
                    if (isNaN(compareTimes[i]) || compareTimes[i] === ' ') {
                        compareTimes.splice(i, 1)
                    }
                }
                
                const reviewObj = {
                    title: data.fields.title,
                    username: data.fields.username,
                    Movies: data.fields.Movies[0],
                    review: data.fields.review,
                    id: reviewId,
                    time: time,
                    compareTimes: compareTimes
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
        if ( rev1.compareTimes < rev2.compareTimes){
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
                    {i===0 ? (
                        <div className='review-btns'>
                            <button onClick={()=>handleEdit(review.id)}>edit</button>
                            <button onClick={()=>handleDelete(review.id)}>delete</button>
                        </div>
                    ) : 
                        <p className='disabled-btn'>delete</p> 
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