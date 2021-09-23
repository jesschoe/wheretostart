import { useState, useEffect } from 'react'
import { getReviews, deleteReview } from '../../services'
import './AllReviews.css'

export default function AllReviews(props) {
    const [reviews, setReviews] = useState([])
    
    useEffect(() => {
        if (props.reviewIds) {
            props.reviewIds.map(async (reviewId) => {
                const data = await getReviews(reviewId)
                const reviewObj = {
                    username: data.fields.username,
                    review: data.fields.review,
                    id: reviewId
                }
                setReviews((prevState) => [...prevState, reviewObj])
        })}
        
    }, [props.reviewIds])

    const handleDelete = async(id) => {  
        await deleteReview(id)
        window.location.reload();
    }

    return (
        <div className='reviews-container'>
            <h3>REVIEWS</h3>
            {reviews.map((review) => 
                <div className='reviews' key={review.id}>
                    <p className='review-text'>{review.review}</p>
                    <p className='review-name'>-{review.username}</p>
                    <button onClick={()=>handleDelete(review.id)}>delete</button>
                </div>
            ) 
            }
        </div>
    )
}
