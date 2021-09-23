
import { useState, useEffect } from 'react'
import { fetchMovieDetails } from '../services'
import Vote from './Vote'
import RingLoader from 'react-spinners/RingLoader'

export default function MovieDetails(props) {
    const [ details, setDetails ] = useState({})
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
        const getDetails = async() => {
            setDetails(await fetchMovieDetails(props.title))
            setLoading(false)
        }
        getDetails()
        
    }, [props.title])

    return (
        
        <div>
           
            { details.Title==='Undefined' ? (<div className='details-container'><RingLoader color='#03e9f4' /></div>) : (
                <div className='details-container' >
                    <h2>
                        {details.Title}
                    </h2>
                    <div 
                        className='img-div' 
                        style={{backgroundImage: `url(${details.Poster})`, 
                        height: '200px', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize:`contain`}}
                    >
                    </div>
                    <Vote id={props.id} />
                    <div className='movie-detail'>
                        <p>Rated: {details.Rated}</p>
                        <p>Directed By: {details.Director}</p>
                        <p>Cast: {details.Actors}</p>
                        <p>Awards: {details.Awards}</p>
                        <p>Plot: {details.Plot}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
