import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovie } from '../services'
import Details from './Details'

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
            
        </div>
    )
}
