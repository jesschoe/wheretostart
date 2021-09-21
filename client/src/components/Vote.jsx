
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovie, voteMovie } from '../services'

export default function Vote(props) {
    const history = useHistory()
    const [numVotes, setNumVotes] = useState(0)
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [cast, setCast] = useState('')
    const [director, setDirector] = useState('')
    const [plot, setPlot] = useState('')
    const [poster, setPoster] = useState('')
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const getMovie = async() => {
            const res = await fetchMovie(props.id)
            setNumVotes(res.fields.votes)
            setTitle(res.fields.title)
            setYear(res.fields.year)
            setCast(res.fields.cast)
            setDirector(res.fields.director)
            setPoster(res.fields.poster)
            setPlot(res.fields.plot)
            setReviews(res.fields.reviews)
        }
        getMovie()

    }, [props.id])

    const upVoteHandler = async() => {
        console.log(props.id)
        let votes = numVotes + 1
        const fields = {
            title,
            year,
            cast,
            plot,
            votes,
            poster,
            director, 
            reviews
        }
        
        await voteMovie(props.id, fields)
        history.push(`/movies/${props.id}/review`)
    }

    const downVoteHandler = async() => {
        let votes = numVotes - 1
        const fields = {
            title,
            year,
            cast,
            plot,
            votes,
            poster,
            director,
            reviews
        }

        await voteMovie(props.id, fields)
        history.push(`/movies/${props.id}/review`)
    }

    return (
        <div>
            <button onClick={upVoteHandler}><i className="fa-thumbs-up"></i>Thumbs Up</button>
            <button onClick={downVoteHandler}><i className="far fa-thumbs-down"></i>Thumbs Down</button>
        </div>
    )
}
