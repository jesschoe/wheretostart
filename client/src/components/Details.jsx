
import { useState, useEffect, useRef } from 'react'
import { fetchMovieDetails } from '../services'
import Vote from './Vote'
import RingLoader from 'react-spinners/RingLoader'

export default function MovieDetails(props) {
    const [ details, setDetails ] = useState({})
    const reviewRef = useRef()

    useEffect(() => {
        const getDetails = async() => {
            setDetails(await fetchMovieDetails(props.title))
        }
        getDetails()
        
    }, [props.title])

    const handleClick = () => {
        reviewRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            { details.Title==='Undefined' ? (
                <div className='details-container'>
                        <RingLoader color='#03e9f4' />
                </div>) : (
                <div className='details-container' >
                    <h2>
                        {details.Title}
                    </h2>
                    <div 
                        className='movie-card' 
                        style={{backgroundImage: `url(${details.Poster})`, 
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize:`contain`}}
                    >
                        <div className='rank'>
                            <h3>#{props.rank}</h3>
                        </div>
                    </div>
                    <Vote id={props.id} />
                    <button className='review-btn' onClick={handleClick}>jump to reviews</button>
                    <div className='movie-detail'>
                        <p>Rated: {details.Rated}</p>
                        <p>Directed By: {details.Director}</p>
                        <p>Cast: {details.Actors}</p>
                        <p>Awards: {details.Awards}</p>
                        <p>Plot: {details.Plot}</p>
                    </div>
                </div>
            )}
            <div ref={reviewRef}>

            </div>
        </div>
    )
}
