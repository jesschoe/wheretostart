import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovies } from '../services/index'

export default function AllMovies() {
    const [ movies, setMovies ] = useState([])

    
    useEffect(() => {
        const setAllMovies = async() => {
        let allMovies = await fetchMovies()
            console.log(allMovies)

        function compare( mov1, mov2 ) {
            if ( mov1.fields.votes < mov2.fields.votes ){
                return 1;
            }
            else {
                return -1;
            }
        }
        allMovies.sort( compare );
        setMovies(allMovies)
        }
        setAllMovies()
    }, [])




    return (
        <div className='movie-container flex-col' >
            {movies.map(movie => {
                return (
                    <Link to={`/movies/${movie.id}`}>
                    <div style={{backgroundImage: `url(${movie.fields?.poster})`, backgroundRepeat: 'no-repeat', backgroundSize:`contain`}} key={movie.id} className='movie-card font-rad'>
                        
                            {/* <img src={movie.fields?.poster} alt={movie.fields?.name} key={movie.id} /> */}
                        <div className='flex-column jusitfy-self-end'>
                            {movie.fields?.title}, {movie.fields?.year}, {movie.fields?.votes}
                        </div>
                    </div>
                    </Link>
                )
            })}
            
        </div>
    )
}

