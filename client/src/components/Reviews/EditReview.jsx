import { useState } from 'react'
import { editReview } from '../../services'
import ReviewForm from './ReviewForm'


export default function SubmitReview(props) {
    const {id, review, Movies, title, username} = props.reviews
    const [ reviews, setReviews ] = useState(review)

    console.log(props)
    const handleSubmit = async(e) => {
        e.preventDefault()
        

        const fields = {
            "title": `${title}`,
            "Movies": [`${Movies}`],
            "review": `${reviews}`,
            "username": `${username}`
        }
        await editReview(id, fields)
        props.setShowModal(prev=>!prev)
        window.location.reload();
    }

    return (
        <ReviewForm 
            handleSubmit={handleSubmit} 
            reviews={reviews} 
            username={username}
            setReviews={setReviews}
            id={id}
            setShowModal={props.setShowModal}
        />
    )
}

