import { useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { fetchMovie, reviewMovie } from '../../services'
import ReviewForm from './ReviewForm'


export default function SubmitReview() {
    const [reviews, setReviews] = useState()
    const [username, setUsername] = useState('anonymous')
    const { id } = useParams()
    const history = useHistory()


    const handleSubmit = async(e) => {
        e.preventDefault()
        
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
        history.push(`/movies/${id}`)
    }

    return (
        <ReviewForm 
            handleSubmit={handleSubmit} 
            reviews={reviews} 
            setReviews={setReviews}
            username={username}
            setUsername={setUsername}
        />
    )
}

