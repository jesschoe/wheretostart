import { useState, useEffect } from 'react'
import { getReviews, deleteReview } from '../services'

export default function Reviews(props) {
    const [reviews, setReviews] = useState([])

    
    useEffect(() => {
        console.log('ids', props.reviewIds)
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
        console.log(id)
        await deleteReview(id)
    }

    return (
        <div className='reviews-container'>
            REVIEWS
            {reviews?.map((review) => 
                    <div className='reviews' key={review.id}>
                        <p className='review-text'>{review.review}</p>
                        <p className='review-name'>{review.username}</p>
                        <button onClick={()=>handleDelete(review.id)} className='delete-button'>delete</button>
                    </div>
                ) 
            }
        </div>
    )
}
