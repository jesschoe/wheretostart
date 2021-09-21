import { useState } from 'react'
import { useHistory } from 'react-router'
import Form from "./Form"
import { fetchMovieDetails, searchMovies, submitMovie } from '../services'

export default function SubmitMovie() {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [movieList, setMovieList] = useState([])

    const handleSearch = async(e) => {
        e.preventDefault()
        const data = await searchMovies(title)
        console.log(data)
        setMovieList(data.Search)
    }

    const handleSubmit = async(e) => {
        console.log(e.target.__reactFiber$jcrtc057eng.key)

        const res = await fetchMovieDetails(e.target.__reactFiber$jcrtc057eng.key)
        console.log(res)
        
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
        <div>
            <div>
                Search for another movie to recommend!
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
                            <div style={{backgroundImage: `url(${movie?.Poster})`, backgroundRepeat: 'no-repeat', backgroundSize:`contain` }} key={movie?.imdbID} onClick={handleSubmit} className='movie-card font-rad'>
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
