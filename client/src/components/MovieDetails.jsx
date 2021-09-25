import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchMovie } from '../services'
import Details from './Details'
import AllReviews from '../components/Reviews/AllReviews'

// use params to fetch single movie id and send props to details and review components
export default function MovieDetails() {
    const { id, rank } = useParams()
    const [ movie, setMovie ] = useState({})

    useEffect(() => {
        const getMovie = async() => {
            const movieTitle = await fetchMovie(id)
            setMovie(movieTitle)
        }
        getMovie()
    }, [id])

    return (
        <div>
            <Details title={movie.fields?.title} id={id} rank={rank} />
            <AllReviews reviewIds={movie.fields?.reviews} /> 
        </div>
    )
}
