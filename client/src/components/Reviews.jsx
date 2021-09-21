import { useState, useEffect } from 'react'
import { fetchMovie } from '../services'
import { getReviews } from '../services'

export default function Reviews(props) {
    const [reviewComments, setReviewComments] = useState([])
    
    useEffect(() => {
        const getMovie = async() => {
            const data = await fetchMovie(props.id)
            console.log(data)
            const reviews =  data.fields.reviews
            console.log(reviews)
            const reviewArr = []
            if (reviews.length > 0) {
                reviews.map(async review => {
                    const rev = await getReviews(review)
                    reviewArr.push(rev)
                    console.log('reviewarr', reviewArr)
                
                })
                setReviewComments(reviewArr) 
                
            }
        }
        getMovie()
    }, [])
    
    return (
        <div>
            REVIEWS
            {reviewComments?.map(comment => {
                return (
                    <div key={comment?.id}>
                        
                        <p>{comment.fields?.review}</p>
                    </div>
                )
            })}
            
        </div>
    )
}
