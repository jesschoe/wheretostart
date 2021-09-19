import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovies } from '../services/index'

export default function AllMovies() {
    const [ movies, setMovies ] = useState([])
    
    useEffect(() => {
        const getMovies = async() => {
            setMovies(await fetchMovies())
        }
        getMovies()
    }, [])

    return (
        <div className='movie-container'>
            {movies.map(movie => {
                return (
                    <div key={movie.id} className='movie-card'>
                        <Link to={`/movies/${movie.id}`}>
                            <img src={movie.fields?.poster} alt={movie.fields?.name} key={movie.id} />
                        </Link>
                        <div>{movie.fields?.title}, {movie.fields?.year}</div>
                    </div>
                )
            })}
            
        </div>
    )
}

