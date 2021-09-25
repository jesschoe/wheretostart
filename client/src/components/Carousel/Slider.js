import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovies } from '../../services'
import './Slider.css'

// slider to display movie cards according to vote ranking
export default function Slider() {
    const [ slideIndex, setSlideIndex ] = useState(1)
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
            allMovies.sort( compare );
            setMovies(allMovies)
        }
        setAllMovies()
    }, [])

    const nextSlide = () => {
        if ( slideIndex !== movies.length) {
            setSlideIndex(slideIndex + 1)
        } else if (slideIndex === movies.length) {
            setSlideIndex(1)
        }
    }
    
    const prevSlide = () => {
        if ( slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        } else if (slideIndex === 1) {
            setSlideIndex(movies.length)
        }
    }

    return (
        <div className='slider-container'>
            {movies.map((movie,i) => {return (
                <div 
                    key={movie.id} 
                    className={slideIndex === i + 1 ? 'slide active' : 'slide'}
                >
                    <Link 
                        to={`/movies/${movie.id}/${i+1}`} 
                        key={movie.id} 
                        style={{ textDecoration: 'none' }}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${movie.fields?.poster})`, 
                                backgroundRepeat: 'no-repeat', 
                                backgroundSize:`contain`}} 
                            className='movie-card'
                        >
                            <div className='rank'>
                                <h3>#{i+1}</h3>
                            </div>
                            <div className='details'>
                                <h3>{movie.fields?.title} \{movie.fields?.year}\</h3>
                            </div>
                        </div>
                    </Link>
                </div> 
            )})}
            <i className="fas fa-chevron-right arrow next" onClick={nextSlide}></i>
            <i className="fas fa-chevron-left arrow prev" onClick={prevSlide}></i> 
        </div>
    )
}
