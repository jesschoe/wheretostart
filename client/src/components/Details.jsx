
import { useState, useEffect } from 'react'
import { fetchMovieDetails } from '../services'

export default function MovieDetails(props) {
    const [ details, setDetails ] = useState()

    useEffect(() => {
        const getDetails = async() => {
            setDetails(await fetchMovieDetails(props.title))
        }
        getDetails()
    }, [props.title])

    return (
        <div className='details-container' >
            <div style={{backgroundImage: `url(${details?.Poster})`, height: '200px', backgroundRepeat: 'no-repeat', backgroundSize:`contain`}}>
            </div>
            <div className='movie-detail'>
                <p>Rated: {details?.Rated}</p>
                <p>Directed By: {details?.Director}</p>
                <p>Cast: {details?.Actors}</p>
                <p>Awards: {details?.Awards}</p>
                <p>Plot: {details?.Plot}</p>
            </div>
            
        </div>
    )
}
