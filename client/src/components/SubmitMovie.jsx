import { useState } from 'react'
import { useHistory } from 'react-router'
import Form from "./Form"
import { searchMovieId, searchMovies, submitMovie } from '../services'

export default function SubmitMovie() {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [movieList, setMovieList] = useState([])

    const handleSearch = async(e) => {
        e.preventDefault()
        const data = await searchMovies(title)
        setMovieList(data.Search)
    }

    const handleClick = value => async() => {
        console.log('value', value)
        const res = await searchMovieId(value)
        console.log('res', res)
        
        const fields = {
            title: res.Title,
            year: res.Year,
            cast: res.Actors,
            plot: res.Plot,
            votes: 0,
            poster: res.Poster,
            director: res.Director
        }

        await submitMovie(fields)
        history.push(`/movies`)
    }

    return (
        <div className='h-screen search-form'>
            <div className='font-rad text-lg'>
                <h3>Search for another movie to recommend!</h3>
                <Form 
                    title={title}
                    setTitle={setTitle}
                    // year={year}
                    // setYear={setYear}
                    handleSearch={handleSearch}
                />
            </div>
            <div className='movie-container'>
                {movieList.map(movie => {
                    return (
                            <div style=
                                {{backgroundImage: `url(${movie?.Poster})`, 
                                backgroundRepeat: 'no-repeat', 
                                backgroundSize:`contain` }} 
                                key={movie?.imdbID} 
                                onClick={handleClick(`${movie?.imdbID}`)} 
                                className='movie-card font-rad'
                            >
                                <div className='flex-column jusitfy-self-end'>
                                    {movie?.Title}, {movie?.Year}
                                </div>
                            </div>
                        
                    )
                })}
            </div>
        </div>
    )
}
