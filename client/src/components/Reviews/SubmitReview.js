import { useState } from 'react'
import { useParams } from 'react-router'
import { fetchMovie, reviewMovie } from '../../services'
import AlertModal from '../AlertModal'
import ReviewForm from './ReviewForm'

// post request to Airtable reviews endpoint for new movie review
export default function SubmitReview(props) {
    const [ reviews, setReviews ] = useState('')
    const [ username, setUsername ] = useState('anonymous')
    const [ showAlert, setShowAlert ] = useState(false)
    const { id } = useParams()

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if (reviews==='') {
            setShowAlert(prev => !prev)
        } else {
            const data = await fetchMovie(id)
            let title
            if (data.fields.reviews?.length) {
                title = `${data.fields.title}${data.fields.reviews.length}`
            } else {
                title = `${data.fields.title}0`
            }

            const fields = {
                "title": `${title}`,
                "Movies": [`${id}`],
                "review": `${reviews}`,
                "username": `${username}`
            }
            await reviewMovie(fields)
            props.setShowModal(prev=>!prev)
            window.location.reload();
        }
    }

    return (
        <>
            <ReviewForm 
                handleSubmit={handleSubmit} 
                reviews={reviews} 
                setReviews={setReviews}
                username={username}
                setUsername={setUsername}
                id={id}
                setShowModal={props.setShowModal}
                message='thanks for voting! would you like to leave a review?'
            />
            <AlertModal 
                showAlert={showAlert} 
                setShowAlert={setShowAlert} 
                alert='please enter your review or click x to close pop-up'
            />
        </>   
    )
}

