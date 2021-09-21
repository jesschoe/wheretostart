import { useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { fetchMovie } from '../services'
import { reviewMovie } from '../services'


export default function SubmitReview() {
    const [reviews, setReviews] = useState()
    const { id } = useParams()
    const history = useHistory()
    // const [movie, setMovie] = useState([])

    // useEffect(() => {
    //     const getMovie = async() => {
    //         const data = await fetchMovie(id)
    //         console.log(data)
    //     }
    //     getMovie()
    // }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = await fetchMovie(id)
        let title
        if (data.fields.reviews?.length) {
            title = `${data.fields.title}${data.fields.reviews.length}`
        } else {
            title = `${data.fields.title}0`
        }

        console.log(e.target[0].defaultValue)
        const fields = {
            "title": `${title}`,
            "Movies": [`${id}`],
            "review": `${e.target[0].defaultValue}`
        }
        await reviewMovie(fields)
        history.push(`/movies/${id}`)
    }

    return (
        <div className='font-rad'>
            Would you like to submit a review?
            <form onSubmit={handleSubmit}>
            <label>Review
                <input 
                    type='text' 
                    value={reviews} 
                    onChange={(e)=>setReviews(e.target.value)} 
                />
            </label>
            <button>Submit!</button>
        </form>
        </div>
    )
}

