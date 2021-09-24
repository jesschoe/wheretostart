import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovie } from '../services'
import Details from './Details'
import AllReviews from '../components/Reviews/AllReviews'

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
            <Details title={movie.fields?.title} id={id} rank={rank}/>
            <AllReviews reviewIds={movie.fields?.reviews} /> 
        </div>
    )
}
