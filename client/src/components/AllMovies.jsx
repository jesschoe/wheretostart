import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovies } from '../services'

// fetch array of movie objects from Airtable and sort according to number of votes
// then display each movie's poster, title, year, and rank on movie card in order
export default function AllMovies() {
    const [ movies, setMovies ] = useState([])

    useEffect(() => {
        const setAllMovies = async() => {
            let allMovies = await fetchMovies()
            
            function compare( mov1, mov2 ) {
                if ( mov1.fields.votes < mov2.fields.votes ){
                    return 1;
                }
                else {
                    return -1;
                }
            }

            allMovies.sort(compare);
            setMovies(allMovies)
        }

        setAllMovies()
    }, [])

    return (
        <div className='movie-container' >
            {movies.map((movie, i) => {
                return (
                    <Link 
                        to={`/movies/${movie.id}/${i+1}`} 
                        key={movie.id} 
                        style={{ textDecoration: 'none' }}
                    >
                        <div 
                            className='movie-card'
                            style={{
                                backgroundImage: `url(${movie.fields?.poster})`, 
                                backgroundRepeat: 'no-repeat', 
                                backgroundSize:`contain`
                            }} 
                        >
                            <div className='rank'>
                                <h3>#{i+1}</h3>
                            </div>
                            <div className='details'>
                                <h3>{movie.fields?.title} \{movie.fields?.year}\</h3>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

