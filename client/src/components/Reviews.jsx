import { useState, useEffect } from 'react'
import { getReviews } from '../services'

export default function Reviews(props) {
    // const [reviewComments, setReviewComments] = useState([])
    

    // useEffect(() => {
    //     const reviewArr = []
    //     // console.log(props.ids)

    //         if (props.ids) {
    //             console.log(props.ids)
    //             props.ids.map(async (reviewId) => {
    //                 const data = await getReviews(reviewId)
    //                 reviewArr.push(data.fields.review)
    //                 // console.log('reviews:', reviewArr)
                
    //         })
    //         setReviewComments(reviewArr) 
    //     }

    // }, [props.ids])

   
    return (
        <div>
            REVIEWS
            {console.log(props.reviewComments)}
            {props.reviewComments.map((comment, i) => 
                    <div key={i}>
                        
                        <p>{comment}</p>
                    </div>
                ) 
            }
            
        </div>
    )
}
