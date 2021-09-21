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
            {movies.map((movie, i) => {
                return (
                    <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <div style={{backgroundImage: `url(${movie.fields?.poster})`, backgroundRepeat: 'no-repeat', backgroundSize:`contain`}} className='flex-col jusitfy-end movie-card font-rad'>
                        <div className='rank'>
                            <h1>#{i+1}</h1>
                        </div>
                        <div className='details'>
                            <h3>{movie.fields?.title}, {movie.fields?.year}</h3>
                        </div>
                    </div>
                    </Link>
                )
            })}
            
        </div>
    )
}

