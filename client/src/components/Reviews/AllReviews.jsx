import { useState, useEffect } from 'react'
import { getReviews, deleteReview } from '../../services'
import './AllReviews.css'

export default function AllReviews(props) {
    const [ reviews, setReviews ] = useState([])

    useEffect(() => {
        if (props.reviewIds) {
            props.reviewIds.map(async (reviewId) => {
                const data = await getReviews(reviewId)
                
                let time = data.createdTime.split('')
                for (let i = 0; i < time.length; i++) {
                    if (time[i] === 'T') {
                        time[i] = ' '
                    } else if (time[i] === '.') {
                        time.splice([i], 5)
                    }
                }
                console.log(time)
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
                    review: data.fields.review,
                    id: reviewId,
                    time: time,
                    compareTimes: compareTimes
                }
                setReviews((prevState) => [...prevState, reviewObj])
        })}

    }, [props.reviewIds])

    const handleDelete = async(id) => {
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

    return (
        <div className='reviews-container'>
            <h3>REVIEWS</h3>
            {reviews.map((review, i) =>
                <div className='reviews' key={review.id}>
                    <p className='review-text'>{review.review}</p>
                    <p className='review-name'>-{review.username}</p>
                    <p className='review-time'>{review.time}</p>
                    {i===0 ? <button onClick={()=>handleDelete(review.id)}>delete</button> : 
                        <p className='disabled-btn'>delete</p> }
                </div>) 
            
            }
        </div>
    )
}
