import { useState, useEffect } from 'react'
import { fetchMovie } from '../services'
import { getReviews } from '../services'

export default function Reviews(props) {
    const [reviewComments, setReviewComments] = useState([])
    
    useEffect(() => {
        const getMovie = async() => {
            const data = await fetchMovie(props.id)
            const reviews =  data.fields.reviews
            const reviewArr = []
            reviews.map(async review => {
                const rev = await getReviews(review)
                reviewArr.push(rev)
                
            })
            setReviewComments(reviewArr)  

        }
        getMovie()
    }, [])
    
    return (
        <div>
            {reviewComments.map(comment => {
                return (
                    <div key={comment?.id}>
                        <h2>Reviews</h2>
                        <p>{comment.fields?.review}</p>
                    </div>
                )
            })}
            
        </div>
    )
}
