import { useState, useEffect } from 'react'
import { getReviews } from '../services'

export default function Reviews(props) {
    const [reviews, setReviews] = useState([])
    
    useEffect(() => {
        if (props.reviewIds) {
            props.reviewIds.map(async (reviewId) => {
                const data = await getReviews(reviewId)
                setReviews((prevState) => [...prevState,data.fields.review])
        })}
        
    }, [props.reviewIds])

    return (
        <div>
            REVIEWS
            {reviews?.map((review, i) => 
                    <div key={i}>
                        <p>{review}</p>
                    </div>
                ) 
            }
        </div>
    )
}
