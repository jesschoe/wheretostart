import { useState } from 'react'
import { useHistory } from 'react-router'
import Form from "./Form"
import { searchMovieId, searchMovies, submitMovie } from '../services'

export default function MovieSearch() {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [movieList, setMovieList] = useState([])

    const handleSearch = async(e) => {
        e.preventDefault()
        const data = await searchMovies(title)
        setMovieList(data.Search)
    }

    const handleClick = value => async() => {
        const res = await searchMovieId(value)
        
        const fields = {
            title: res.Title,
            year: res.Year,
            cast: res.Actors,
            plot: res.Plot,
            votes: 1,
            poster: res.Poster,
            director: res.Director
        }

        await submitMovie(fields)
        // history.push(`/movies/${movie.id}/review`)
    }

    return (
        <div>
            <div className='search-form'>
                <h3>Search for another movie to recommend!</h3>
                <Form 
                    title={title}
                    setTitle={setTitle}
                    handleSearch={handleSearch}
                />
            </div>
            <div className='movie-container'>
                <h5>Select the movie you'd like to add to the list
                Your selection will automatically have 1 vote</h5>
                {movieList?.map(movie => {
                    return (
                            <div style=
                                {{backgroundImage: `url(${movie?.Poster})`, 
                                backgroundRepeat: 'no-repeat', 
                                backgroundSize:`contain` }} 
                                key={movie?.imdbID} 
                                onClick={handleClick(`${movie?.imdbID}`)} 
                                className='movie-card'
                            >
                                <div>

                                </div>
                                <div className='details'>
                                    <p>{movie?.Title}, {movie?.Year}</p>
                                </div>
                            </div>
                        
                    )
                })}
            </div>
        </div>
    )
}
