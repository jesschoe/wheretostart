import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovie } from '../services'
import Details from './Details'
import Vote from './Vote'
import Reviews from './Reviews'

export default function MovieDetails() {
    const { id } = useParams()
    const [ movie, setMovie ] = useState({})

    useEffect(() => {
        const getMovie = async() => {
            setMovie(await fetchMovie(id))

        }
        getMovie()
    }, [id])

    return (
        <div>
            
            <Details title={movie.fields?.title} />
            <Vote id={id} />
            <Reviews ids={movie.fields?.reviews} />
        </div>
    )
}
