import { useState } from 'react'
import { useHistory } from 'react-router'
import RingLoader from 'react-spinners/RingLoader'
import { fetchMovies, searchMovieId, searchMovies, submitMovie } from '../services'
import MovieSearchForm from "./MovieSearchForm"

// search OMDB API for submitted movie title and display search results
export default function MovieSearch() {
    const [title, setTitle] = useState('')
    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSearch = async(e) => {
        e.preventDefault()
        setLoading(true)
        const data = await searchMovies(title)
        setMovieList(data.Search)
        setLoading(false)
    }

    const handleClick = value => async() => {
        const res = await searchMovieId(value)
        const allMovies = await fetchMovies()
        let exists = false 
        
        function compare( mov1, mov2 ) {
            if ( mov1.fields.votes < mov2.fields.votes ){
                return 1;
            }
            else {
                return -1;
            }
        }
        allMovies.sort(compare)

        // check if movie already exists in Airtable
        // if movie exists, send user to that movie's detail page
        for (let i = 0; i < allMovies.length; i++) {
            if (res.Title === allMovies[i].fields.title) {
                history.push(`/movies/${allMovies[i].id}/${i+1}`)
                exists = true
            } 
        }

        //if movie doesn't exist, create object of movie details and post request to Airtable to add to list
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
                <h3>Enter the full title of another movie to recommend: </h3>
                <MovieSearchForm 
                    title={title}
                    setTitle={setTitle}
                    handleSearch={handleSearch}
                />
            </div>
                <h5>
                    Select the movie you'd like to add to the list. 
                    If the movie is already on the list, it will take you to its voting page.
                </h5>
            <div className='movie-container'>
                {loading ? <RingLoader color='#03e9f4' /> : 
                movieList?.map(movie => {
                    return (
                        <div 
                            className='movie-card'
                            style={{
                                backgroundImage: `url(${movie?.Poster})`, 
                                backgroundRepeat: 'no-repeat', 
                                backgroundSize:`contain` 
                            }} 
                            key={movie?.imdbID} 
                            onClick={handleClick(`${movie?.imdbID}`)} 
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
