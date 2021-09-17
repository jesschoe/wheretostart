
import { useState, useEffect } from 'react'
import { fetchMovieDetails } from '../services'
import Vote from './Vote'

export default function MovieDetails(props) {
    const [ details, setDetails ] = useState()

    useEffect(() => {
        const getDetails = async() => {
            setDetails(await fetchMovieDetails(props.title))
        }
        getDetails()
    }, [props.title])

    return (
        <div>
            <img src={details?.Poster} alt={details?.Title} />
            <div>
                <p>{details?.Rated}</p>
                <p>{details?.Director}</p>
                <p>{details?.Actors}</p>
                <p>{details?.Awards}</p>
                <p>{details?.Plot}</p>
            </div>
            <Vote />
        </div>
    )
}
