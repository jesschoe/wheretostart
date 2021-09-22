import { useState, useEffect } from 'react'
import { getReviews } from '../services'

export default function Reviews(props) {
    const [reviews, setReviews] = useState([])

    
    useEffect(() => {
        if (props.reviewIds) {
            props.reviewIds.map(async (reviewId) => {
                const data = await getReviews(reviewId)
                const reviewObj = {
                    username: data.fields.username,
                    review: data.fields.review
                }
                setReviews((prevState) => [...prevState, reviewObj])
        })}
        
    }, [props.reviewIds])

    const handleDelete = () => {

    }

    return (
        <div className='reviews-container'>
            REVIEWS
            {reviews?.map((review, i) => 
                    <div className='reviews' key={i}>
                        <p className='review-text'>{review.review}</p>
                        <p className='review-name'>{review.username}</p>
                        <button onClick={handleDelete} className='delete-button'>delete</button>
                    </div>
                ) 
            }
        </div>
    )
}
