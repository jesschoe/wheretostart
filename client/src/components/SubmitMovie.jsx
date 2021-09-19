import { useState } from 'react'
import { useHistory } from 'react-router'
import Form from "./Form"
import { fetchMovieDetails, submitMovie } from '../services'

export default function SubmitMovie() {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')


    const handleSubmit = async(e) => {
        e.preventDefault()

        const res = await fetchMovieDetails(title)
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
        history.push(`/movies/`)
    }

    return (
        <div>
            What's another movie that belongs on the list?
            <Form 
                title={title}
                setTitle={setTitle}
                year={year}
                setYear={setYear}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
