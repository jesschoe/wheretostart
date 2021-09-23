import { useState } from 'react'
import { useHistory } from 'react-router'
import Form from "./Form"
import { fetchMovies, searchMovieId, searchMovies, submitMovie } from '../services'

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
        const allMovies = await fetchMovies()
        let exists = false 
        console.log(res.Title)
        

        for (let i = 0; i < allMovies.length; i++) {
            if (res.Title === allMovies[i].fields.title) {
                history.push(`/movies/${allMovies[i].id}`)
                exists = true
            } 
        }

        if (exists === false) {
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
            history.push(`/movies`)
        }

    }    


    

    return (
        <div className='search-container'>
            <div className='search-form'>
                <h3>Search for another movie to recommend!</h3>
                <Form 
                    title={title}
                    setTitle={setTitle}
                    handleSearch={handleSearch}
                />
            </div>
            <h5>Select the movie you'd like to add to the list
                Your selection will automatically have 1 vote</h5>
            <div className='movie-container'>
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
