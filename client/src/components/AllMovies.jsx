import { useState, useEffect } from 'react'
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
        <div>
            {movies.map(movie => {
                return (
                    <div key={movie.id}>
                        <img src={movie.fields?.poster} alt={movie.fields?.name} key={movie.id} />
                        <div>{movie.fields?.title}, {movie.fields?.year}</div>
                    </div>
                )
            })}
        </div>
    )
}

