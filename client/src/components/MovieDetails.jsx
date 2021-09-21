import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovie, getReviews } from '../services'
import Details from './Details'
import Vote from './Vote'
import Reviews from './Reviews'

export default function MovieDetails() {
    const { id } = useParams()
    const [ movie, setMovie ] = useState({})
    const [reviewComments, setReviewComments] = useState([])
    // const [isLoaded, setIsLoaded] = useState(true)
    
    useEffect(() => {
        const getMovie = async() => {
            const reviewArr = []
            const movieTitle = await fetchMovie(id)
            setMovie(movieTitle)
            
            if (movieTitle.fields.reviews) {
                
                movieTitle.fields.reviews.map(async (reviewId) => {
                    const data = await getReviews(reviewId)
                    setReviewComments((prevState) => [...prevState,data.fields.review])
                    // console.log('reviews:', reviewArr)
                
            })

        }
    }
        getMovie()
        // setIsLoaded(false)
    }, [])

        // if (isLoaded) {
        //     return 'is loading'
        // }

    return (
        <div>
            
            <Details title={movie.fields?.title} id={id}/>
            <Reviews reviewComments={reviewComments} /> 
        </div>
    )
}
