import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovie } from '../services'
import Details from './Details'
import Reviews from './Reviews'

export default function MovieDetails() {
    const { id } = useParams()
    const [ movie, setMovie ] = useState({})
    console.log('params', id)
    useEffect(() => {
        const getMovie = async() => {
            const movieTitle = await fetchMovie(id)
            setMovie(movieTitle)
        }
        getMovie()
    }, [id])

    return (
        <div>
            <Details title={movie.fields?.title} id={id} />
            <Reviews reviewIds={movie.fields?.reviews} /> 
        </div>
    )
}
