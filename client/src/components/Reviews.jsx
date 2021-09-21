import { useState, useEffect } from 'react'
import { getReviews } from '../services'

export default function Reviews(props) {
    const [reviewComments, setReviewComments] = useState([])
    

    useEffect(() => {
        const reviewIds = props.ids
        const reviewArr = []
        console.log(props.ids)

            if (props.ids) {
                props.ids.map(async (reviewId) => {
                    const data = await getReviews(reviewId)
                    reviewArr.push(data)
                    console.log('reviewarr', reviewArr)
                
            })
            setReviewComments(reviewArr) 
        }

    }, [props.ids])


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
